import React from "react";
import { AlgorithmVisualiationWindowProps } from "./AlgorithmVisualiationWindowProps";
import { StyledAlghorithmWindow } from "./styles";
import { GraphVis } from "../GraphComponent";

// added it here only to pass as argument
const exampleData = {
  nodes: [
    { id: "Node1", x: 350, y: 100 },
    { id: "Node2", x: 250, y: 220 },
    { id: "Node3", x: 380, y: 340 },
    { id: "Node4", x: 450, y: 220 },
    { id: "Node5", x: 520, y: 340 },
  ],
  links: [
    { source: "Node1", target: "Node2" },
    { source: "Node1", target: "Node4" },
    { source: "Node4", target: "Node3" },
    { source: "Node4", target: "Node5" },
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
