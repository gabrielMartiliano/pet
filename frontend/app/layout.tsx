
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Portal do Colaborador",
    template: "%s | Portal do Colaborador",
  },
  description: "Sistema de Gestão de Atendimento",
};

export const viewport: Viewport = {
  themeColor: "#176d89",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} antialiased`}>
        {children}

        <Toaster position="top-right" richColors />

        {process.env.NODE_ENV === "production" && (
          <Analytics />
        )}
      </body>
    </html>
  );
}
