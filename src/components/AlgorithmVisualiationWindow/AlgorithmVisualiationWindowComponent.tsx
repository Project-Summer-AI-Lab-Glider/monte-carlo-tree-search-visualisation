import React from "react";
import { TreeNode } from "../../logic/treeBuilder/treeNode";
import { GraphData, GraphLink, GraphNode, GraphVis } from "../GraphVisualization/GraphComponent";
import { AlgorithmVisualiationWindowProps } from "./AlgorithmVisualiationWindowProps";
import { StyledAlghorithmWindow } from "./styles";
import { useActualTree } from "./useActualTree";

export const createNodeId = (ordinalNumber: number, parentNodeId: string): string =>
  `${parentNodeId}_${ordinalNumber}`;

function mapTreeToGraphData(
  treeRoot: TreeNode,
  ordinalNumber = 0,
  parentNodeId = "Root"
): GraphData {
  const rootNode = {
    id: createNodeId(ordinalNumber, parentNodeId),
  };

  const nodes: GraphNode[] = [rootNode];
  const links: GraphLink[] = [];
  treeRoot.children.forEach((child, index) => {
    const childSubtree = mapTreeToGraphData(child, index, rootNode.id);
    const childAsNode = childSubtree.nodes[0];
    links.push(
      {
        source: rootNode.id,
        target: childAsNode.id,
      },
      ...childSubtree.links
    );
    nodes.push(...childSubtree.nodes);
  });
  return {
    nodes,
    links,
  };
}

function AlgorithmVisualiationWindowF(
  props: AlgorithmVisualiationWindowProps,
  ref?: React.Ref<HTMLDivElement>
): JSX.Element {
  const currentRunTree = useActualTree();
  const graphData = currentRunTree ? mapTreeToGraphData(currentRunTree) : { nodes: [], links: [] };
  return (
    <StyledAlghorithmWindow {...props} ref={ref}>
      <GraphVis data={graphData} />
    </StyledAlghorithmWindow>
  );
}

export const AlgorithmVisualiationWindow = React.forwardRef(AlgorithmVisualiationWindowF);
