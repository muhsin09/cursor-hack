import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zeka Kutusu - Okul Öncesi Eğitim Oyunları',
  description: 'Okul öncesi çocuklar için eğitsel oyunlar',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        {children}
      </body>
    </html>
  );
}
