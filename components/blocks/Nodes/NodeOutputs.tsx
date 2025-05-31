"use client";

import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import { ReactNode } from "react";
import NodeParamField from "./NodeParamField";
import { ColorForHandle } from "./common";

export function NodeOutputs({ children }: { children: ReactNode }) {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
}

export function NodeOutput({
  Output,
  nodeId,
}: {
  Output: TaskParam;
  nodeId: string;
}) {
  return (
    <div className="flex justify-end relative p-3 bg-secondary">
      {/*
      <NodeParamField param={Output} nodeId={nodeId} />
      */}
      <p className="text-xs text-muted-foreground">{Output.name}</p>
      <Handle
        id={Output.name}
        type="source"
        position={Position.Right}
        className={cn(
          "!bg-muted-foreground !border-2 !border-background !-right-2 !w-4 !h-4",
          ColorForHandle[Output.type],
        )}
      />
    </div>
  );
}
