import { SimpleGraph } from "./SimpleGraph";
import { Node } from "./Node";
import { GraphData } from "./GraphComponent";

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
export function allocateNodes(data: GraphData): void {
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
  const parentWidth = 1000;
  const parentHeight = 600;

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
