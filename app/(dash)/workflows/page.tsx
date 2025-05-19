import UserWorkflows from "@/components/blocks/workflows/Userworkflows";
import UserworkflowsSkeleton from "@/components/blocks/workflows/UserworkflowsSkeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex flex-q flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>
      </div>

      <div className="h-full py-6">
        <Suspense fallback={<UserworkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
}
