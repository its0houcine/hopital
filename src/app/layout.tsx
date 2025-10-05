import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import QueryProvider from '@/providers/QueryProvider';
import { LoadingProvider } from './loading-provider';
import GlobalLogoutHandler from '@/components/auth/GlobalLogoutHandler';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <AuthProvider>
            <QueryProvider>
              <SidebarProvider>
                <LoadingProvider>
                  <GlobalLogoutHandler />
                  {children}
                </LoadingProvider>
              </SidebarProvider>
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
