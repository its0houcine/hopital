import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connexion - ELhassi',
  description: 'Connectez-vous à votre compte ELhassi',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
