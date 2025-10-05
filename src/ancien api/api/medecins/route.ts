import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export async function GET() {
  try {
    const medecins = await prisma.user.findMany({
      where: { role: "medecin" },
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        telephone: true,
        specialite: true,
        photo: true,
        cree_le: true,
        role: true
      },
      orderBy: { cree_le: 'desc' }
    });
    
    return NextResponse.json(medecins);
  } catch (error) {
    console.error("Erreur lors de la récupération des médecins:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des médecins" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const hashedPassword = await hash(
      (formData.get("mot_de_passe") as string) || "password123",
      10
    );

    const medecin = await prisma.user.create({
      data: {
        nom: formData.get("nom") as string,
        prenom: formData.get("prenom") as string,
        email: formData.get("email") as string,
        mot_de_passe: hashedPassword,
        role: "medecin",
        specialite: formData.get("specialite") as string,
        telephone: formData.get("telephone") as string,
        photo: formData.get("photo") ? await (async (file: File) => {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          
          const fileName = `${Date.now()}-${file.name}`;
          const filePath = `/uploads/${fileName}`;
          
          const { writeFile, mkdir } = require('fs/promises');
          const { join } = require('path');
          
          await mkdir('public/uploads', { recursive: true });
          await writeFile(join(process.cwd(), 'public', 'uploads', fileName), buffer);
          
          return filePath;
        })(formData.get("photo") as File) : null,
      },
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        telephone: true,
        specialite: true,
        photo: true,
        cree_le: true,
        role: true
      }
    });

    return NextResponse.json(medecin);
  } catch (error) {
    console.error("Erreur lors de la création du médecin:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du médecin" },
      { status: 500 }
    );
  }
}

