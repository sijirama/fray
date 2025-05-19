"use client";

import { ThemeProvider } from "next-themes";
import React, { useState } from "react";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [queryCient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryCient}>
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
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
