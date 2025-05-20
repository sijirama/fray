import Editor from "@/components/blocks/Editor/Editor";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";

export default async function Page(params: any) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { workflowId } = params;

  if (!session?.user) {
    return <div>unauthorised</div>;
  }

  const workflow = await db.workflow.findFirst({
    where: {
      id: workflowId,
      userId: session.user.id,
    },
  });

  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  return <Editor workflow={workflow} />;
}
