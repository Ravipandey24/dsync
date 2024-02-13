import "./globals.css";
import { Providers } from "@/components/Providers";
import { siteConfig } from "../lib/config";
import type { Metadata } from 'next'
 

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={siteConfig.bodyFont.className + " dark"}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
