import React from "react";
import { AlgorithmVisualiationWindowProps } from "./AlgorithmVisualiationWindowProps";
import { StyledAlghorithmWindow } from "./styles";
import { GraphVis, GraphData } from "../GraphVisualization/GraphComponent";

// added it here only to pass as argument
const exampleData: GraphData = {
  nodes: [
    { id: "Node1" },
    { id: "Node2" },
    { id: "Node3" },
    { id: "Node4" },
    { id: "Node5" },
    { id: "Node6" },
    { id: "Node7" },
    { id: "Node8" },
    { id: "Node9" },
  ],
  links: [
    { source: "Node1", target: "Node2" },
    { source: "Node1", target: "Node4" },
    { source: "Node4", target: "Node3" },
    { source: "Node4", target: "Node5" },
    { source: "Node4", target: "Node6" },
    { source: "Node5", target: "Node7" },
    { source: "Node5", target: "Node8" },
    { source: "Node2", target: "Node9" },
  ],
};

function AlgorithmVisualiationWindowF(
  props: AlgorithmVisualiationWindowProps,
  ref?: React.Ref<HTMLDivElement>
): JSX.Element {
  return (
    <StyledAlghorithmWindow {...props} ref={ref}>
      <GraphVis data={exampleData} />
    </StyledAlghorithmWindow>
  );
}

export const AlgorithmVisualiationWindow = React.forwardRef(AlgorithmVisualiationWindowF);
