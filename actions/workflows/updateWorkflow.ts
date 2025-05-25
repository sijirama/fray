"use server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { WorkflowStatus } from "@/types/workflow";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function updateWorkflow({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    throw new Error("Unauthenticated");
  }

  const workflow = await db.workflow.findUnique({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!workflow) throw new Error("workflow not found");
  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error("workflow is not a draft");
  }

  await db.workflow.update({
    where: {
      id,
      userId: session.user.id,
    },
    data: {
      definition,
    },
  });

  revalidatePath("/workflows");
}
