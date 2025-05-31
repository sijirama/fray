"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateFrayNode } from "@/lib/workflow/createFrayNode";
import { CreateWorkflowSchema, createWorkflowType } from "@/schema/workflows";
import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { WorkflowStatus } from "@/types/workflow";
import { Edge } from "@xyflow/react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function CreateWorkflow(form: createWorkflowType) {
  const { success, data } = CreateWorkflowSchema.safeParse(form);
  if (!success) {
    throw new Error("Invalid form input");
  }
  const session = await auth.api.getSession({
    headers: headers(),
  });
  if (!session) {
    throw new Error("Unauthenticated");
  }

  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };
  initialFlow.nodes.push(CreateFrayNode(TaskType.LAUNCH_BROWSER));

  const result = await db.workflow.create({
    data: {
      userId: session.user.id,
      definition: JSON.stringify(initialFlow),
      status: WorkflowStatus.DRAFT,
      ...data,
    },
  });

  if (!result) {
    throw new Error("failed to create workflow");
  }

  redirect(`workflow/editor/${result.id}`);
}
