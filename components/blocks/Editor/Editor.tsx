import { Workflow } from "@prisma/client";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./FlowEditor";
import Topbar from "../Topbar/Topbar";

interface Props {
  workflow: Workflow;
}

export default function Editor(props: Props) {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full w-full overflow-hidden ">
        <Topbar
          title={props.workflow.name}
          subtitle={"Working type shit"}
          workflowId={props.workflow.id}
        />
        <section className="flex h-full overflow-auto">
          <FlowEditor workflow={props.workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
}
