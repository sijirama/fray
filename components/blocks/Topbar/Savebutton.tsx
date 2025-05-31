"use client";

import { updateWorkflow } from "@/actions/workflows/updateWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon } from "lucide-react";
import { toast } from "sonner";

export default function Savebutton({ workflowId }: { workflowId: string }) {
  const { toObject } = useReactFlow();
  const saveMutation = useMutation({
    mutationFn: updateWorkflow,
    onSuccess: () => {
      toast.success("Flow saved successfully", { id: "save-workflow" });
    },
    onError: () => {
      toast.error("SOmething went wrong", { id: "save-workflow" });
    },
  });
  return (
    <Button
      disabled={saveMutation.isPending}
      variant={"outline"}
      className="flex items-center gap-2"
      onClick={() => {
        const workflowDefnition = JSON.stringify(toObject());
        toast.loading("Saving workflow", { id: "save-workflow" });
        saveMutation.mutate({ id: workflowId, definition: workflowDefnition });
      }}
    >
      <CheckIcon size={16} className="stroke-rose-400" />
      Save
    </Button>
  );
}
