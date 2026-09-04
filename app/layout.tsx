import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Noto_Kufi_Arabic } from 'next/font/google';
import { AuthProvider } from '@/components/auth/auth-provider';
import { LanguageProvider } from '@/lib/i18n/language-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});
const notoKufi = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'NEXVO — Smart Waste Management Platform',
  description:
    'The operating system for a city\u2019s waste ecosystem. Connecting citizens, municipalities, businesses, waste companies, drivers, field teams, recyclers, fleet, IoT, and AI into one unified platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${spaceGrotesk.variable} ${notoKufi.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
