import { Graph } from "react-d3-graph";
import { GraphNode, GraphLink } from "./GraphComponent";

function updateNodesHighlightedValue(
  nodes: Record<string, GraphNode>,
  links: Record<string, GraphLink>,
  id: string,
  value = false
): LastHighlightedState {
  const highlightedNode = value ? id : "";
  const node = { ...nodes[id], highlighted: value };

  let updatedNodes = { ...nodes, [id]: node };

  if (links[id]) {
    updatedNodes = Object.keys(links[id]).reduce((acc, linkId) => {
      const updatedNode = { ...updatedNodes[linkId], highlighted: value };

      acc[linkId] = updatedNode;

      return acc;
    }, updatedNodes);
  }

  return {
    nodes: updatedNodes,
    highlightedNode,
  };
}

function clearNodeHighlight(
  nodes: Record<string, GraphNode>,
  links: Record<string, GraphLink>
): { nodes: Record<string, GraphNode> } {
  nodes = _.cloneDeep(nodes);
  Object.values(nodes).forEach((node) => {
    node.highlighted = false;
  });

  return {
    nodes,
  };
}

interface LastHighlightedState {
  nodes?: Record<string, GraphNode>;
  links?: Record<string, GraphLink>;
  highlightedNode?: string;
}
export class GraphWithFixedHighlight extends Graph<GraphNode, GraphLink> {
  private lastHighlightedState: LastHighlightedState = {};

  _setNodeHighlightedValue = (id: string, value = false): void => {
    this.lastHighlightedState = updateNodesHighlightedValue(
      this.lastHighlightedState.nodes ?? {},
      this.lastHighlightedState.links ?? {},
      id,
      value
    );
  };

  clearHighlight(): void {
    this.lastHighlightedState = clearNodeHighlight(this.state.nodes, this.state.links);
    this.updateHighligth();
  }

  updateHighligth(): void {
    this.setState(this.lastHighlightedState);
  }
}
