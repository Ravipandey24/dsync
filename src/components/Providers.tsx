// app/providers.tsx
"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";
import { dark } from "@clerk/themes";
import { siteConfig } from "@/lib/config";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <NextUIProvider>{children}</NextUIProvider>
      <Toaster
        position="top-center"
        theme="dark"
        className={siteConfig.bodyFont.className + " text-lg"}
      />
    </ClerkProvider>
  );
}
