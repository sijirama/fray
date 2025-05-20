"use server";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function DeleteWorkflow(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthenticated");
  }

  await prisma?.workflow.delete({
    where: {
      id,
      userId: session.user.id,
    },
  });

  revalidatePath("/workflows");
}
