import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Start Nexus | Tecnologia, Educação e Sustentabilidade",
  description:
      "ONG de tecnologia que une educação e sustentabilidade por meio da reciclagem de e-lixo e formação profissional.",
};

export default function RootLayout({
                                     children,
                                   }: {
  children: ReactNode;
}) {
  return (
      <html
          lang="pt-BR"
          className={`${montserrat.variable} ${inter.variable} scroll-smooth`}
      >
      <body className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {children}
      </body>
      </html>
  );
}
