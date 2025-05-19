"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GetWorkflowsForUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthenticated");
  }
  return prisma?.workflow.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}
