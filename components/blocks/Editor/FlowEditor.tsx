"use client";

import { TaskType } from "@/types/task";
import { Workflow } from "@prisma/client";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import NodeComponent from "../Nodes/NodeComponent";
import { CreateFrayNode } from "@/lib/workflow/createFrayNode";

const nodeTypes = {
  FrayNode: NodeComponent,
};

interface Props {
  workflow: Workflow;
}

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding: 2.5 };

export default function FlowEditor(props: Props) {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    CreateFrayNode(TaskType.LAUnCH_BROWSER),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={snapGrid}
        fitView={true}
        fitViewOptions={fitViewOptions}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={10} size={1} />
      </ReactFlow>
    </main>
  );
}
