import { Graph } from "react-d3-graph";
import { SimpleGraph } from "./SimpleGraph";
import { Node } from "./Node";

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

const myConfig = {
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

function convertGraphDataToSimpleGraph(data: GraphData): SimpleGraph | undefined {
  const graph = new SimpleGraph();
  data.nodes.forEach((node) => {
    graph.addNode(new Node(node.id));
    return null;
  });
  data.links.forEach((link) => {
    const fromNode = graph.findNodeById(link.source);
    const toNode = graph.findNodeById(link.target);
    if (fromNode === undefined || toNode === undefined) {
      return undefined;
    }
    graph.addEdge(fromNode, toNode);
    return graph;
  });
  return graph;
}

function allocateNodes(data: GraphData) {
  const { links } = data;

  const sources: Set<string> = new Set();
  const targets: Set<string> = new Set();

  links.forEach((link) => {
    sources.add(link.source);
    targets.add(link.target);
  });

  const root = [...sources].find((source) => !targets.has(source));
  if (!root) {
    return;
  }
  const simpleGraphFromData = convertGraphDataToSimpleGraph(data);
  const depth = simpleGraphFromData?.dfsCountDepth(root) ?? 0;

  // Hardcoded, intended to get the container size
  const parentWidth = 700;
  const parentHeight = 400;

  let parentCellWidth = parentWidth;

  for (let i = 0; i <= depth!; i += 1) {
    const layer = simpleGraphFromData?.adjacencyList.filter((node) => node.height === i);
    if (layer!.length > 1) {
      layer?.sort((a: Node, b: Node) => a!.parent!.x - b!.parent!.x);
    }
    const layerY = (parentHeight / depth! / 2) * (1 + 2 * i);

    const siblingsCount = layer!.length;

    for (let j = 0; j < siblingsCount!; j += 1) {
      let parentBorderX = 0;
      if (layer?.[j]?.parent !== undefined) {
        parentBorderX = layer![j]!.parent!.x - parentCellWidth / 2;
      }
      if (siblingsCount === 1) {
        layer![j]!.x = parentBorderX + 0.5 * parentCellWidth;
      } else {
        layer![j]!.x =
          parentBorderX +
          ((2 * layer![j]!.parent!.getChildIndex(layer![j]!) + 1) * parentCellWidth) /
            layer![j]!.parent!.children.length /
            2;
      }
      layer![j]!.y = layerY;
    }

    if (siblingsCount > 1) {
      parentCellWidth /= siblingsCount;
    }
  }

  data.nodes.forEach((node) => {
    const nodeInGraphStructure = simpleGraphFromData?.adjacencyList.find((n) => n.id === node.id);
    if (nodeInGraphStructure === undefined || nodeInGraphStructure === null) {
      return;
    }
    node.x = nodeInGraphStructure.x;
    node.y = nodeInGraphStructure.y;
  });
}

export function GraphVis({ data }: { data: GraphData }): JSX.Element {
  return (
    <div>
      {allocateNodes(data)}
      <Graph id="graph" data={data} config={myConfig} />
    </div>
  );
}
