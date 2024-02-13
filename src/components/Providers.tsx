// app/providers.tsx
"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import toast, { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <NextUIProvider>{children}</NextUIProvider>
      <Toaster />
    </ClerkProvider>
  );
}
