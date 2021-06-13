import { Graph, GraphConfiguration } from "react-d3-graph";
import { allocateNodes } from "./graphPreprocessing";

export interface GraphNode {
  id: string;
  x?: number;
  y?: number;
}
export interface GraphLink {
  source: string;
  target: string;
}
export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

const graphConfig: Partial<GraphConfiguration<GraphNode, GraphLink>> = {
  nodeHighlightBehavior: true,
  node: {
    color: "lightgray",
    highlightColor: "orange",
    size: 200,
  },
  link: {
    highlightColor: "orange",
  },
};

export function GraphVis({ data }: { data: GraphData }): JSX.Element {
  return (
    <div>
      {allocateNodes(data)}
      <Graph id="graph" data={data} config={graphConfig} />
    </div>
  );
}
