"use client";

import { ThemeProvider } from "next-themes";
import React from "react";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => {
        router.refresh();
      }}
    >
      <ThemeProvider attribute={"class"} defaultTheme="dark" enableSystem>
        {children}
      </ThemeProvider>
    </AuthUIProvider>
  );
}
