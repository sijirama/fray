import { createAuthClient } from "better-auth/react";
import { CONFIG } from "./config";

export const authClient = createAuthClient({
  baseURL: CONFIG.URL,
});

export const { signIn, signOut, signUp, useSession } = authClient;
