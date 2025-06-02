import { TaskRegistry } from "@/lib/workflow/task/registry";
import { AppNode } from "@/types/appNode";
import {
  WorkflowExecutionPlan,
  WorkflowExecutionPlanPhase,
} from "@/types/workflow";
import { Edge, getIncomers } from "@xyflow/react";

type FlowToExecutionPlanType = {
  executionPlan?: WorkflowExecutionPlan;
};

export function FlowToExecutionPlan(
  nodes: AppNode[],
  edges: Edge[],
): FlowToExecutionPlanType {
  const entryPoint = nodes.find(
    (node) => TaskRegistry[node.data.type].isEntryPoint,
  );

  if (!entryPoint) {
    throw new Error("TODO: HANDLE THIS ERROR");
  }

  const planned = new Set<string>();
  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint],
    },
  ];

  for (
    let phase = 2;
    phase <= nodes.length || planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };

    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        // Node already put in the execution plan.
        continue;
      }

      const invalidInputs = getInvalidInputs(currentNode, edges, planned);
      if (invalidInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges);
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          // If all incoming incomers/edges are planned and there are still invalid inputs
          // this means that this particular node has an invalid input
          // which means that the workflow is invalid
          console.error("invalid inputs", currentNode.id, invalidInputs);
          throw new Error("TODO: HANDLE ERROR 1");
        } else {
          // Let's skip this node for now
          continue;
        }
      }

      nextPhase.nodes.push(currentNode);
      planned.add(currentNode.id);
    }
  }

  return { executionPlan };
}

function getInvalidInputs(
  currentNode: AppNode,
  edges: Edge[],
  planned: Set<string>,
) {
  const invalidInputs: any[] = [];

  return invalidInputs;
}
