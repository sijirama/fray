"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateWorkflowSchema, createWorkflowType } from "@/schema/workflows";
import { WorkflowStatus } from "@/types/workflow";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function CreateWorkflow(form: createWorkflowType) {
  const { success, data } = CreateWorkflowSchema.safeParse(form);
  if (!success) {
    throw new Error("Invalid form input");
  }
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthenticated");
  }
  const result = await db.workflow.create({
    data: {
      userId: session.user.id,
      definition: "TODO",
      status: WorkflowStatus.DRAFT,
      ...data,
    },
  });

  if (!result) {
    throw new Error("failed to create workflow");
  }

  redirect(`workflow/editor/${result.id}`);
}
