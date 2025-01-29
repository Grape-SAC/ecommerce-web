import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "reflect-metadata";

const raleway = Roboto({
  weight: ['400', '700'], // Usar peso SemiBold
  subsets: ['latin'], // Compatibilidad con caracteres
});

export const metadata: Metadata = {
  title: "Create Next Appx",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${raleway.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
