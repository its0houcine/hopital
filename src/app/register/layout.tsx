import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inscription - ELhassi',
  description: 'Créez un compte sur ELhassi',
};

export default function RegisterLayout({
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
