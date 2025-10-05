import { NextResponse } from 'next/server';

// Endpoint simple pour vérifier l'état de l'API
export async function GET() {
  return NextResponse.json(
    { 
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '3.0.0'
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
        'Content-Type': 'application/json'
      }
    }
  );
}
