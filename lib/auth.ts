import { betterAuth } from "better-auth";

import { prismaAdapter } from "better-auth/adapters/prisma";
import { CONFIG } from "./config";
import { db } from "./db";
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  baseURL: CONFIG.URL,
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
});
