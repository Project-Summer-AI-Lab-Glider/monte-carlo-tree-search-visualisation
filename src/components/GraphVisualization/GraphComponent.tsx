import React from "react";
import { GraphConfiguration } from "react-d3-graph";
import { connect } from "react-redux";
import { StepName, StepResult } from "../../logic/algo/stepModels";
import { TreeNode } from "../../logic/treeBuilder/treeNode";
import { ApplicationState } from "../../state/appReducer";
import { allocateNodes } from "./graphPreprocessing";
import { GraphWithFixedHighlight } from "./GraphWithFixedHighlight";

export interface GraphNode {
  id: string;
  x?: number;
  y?: number;
  highlighted?: boolean;
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
  highlightDegree: 0,
  node: {
    color: "lightgray",
    highlightColor: "orange",
    size: 200,
  },
  link: {
    highlightColor: "orange",
  },
};

interface GraphVisProps {
  data: GraphData;
  lastStepResult: StepResult;
}

class GraphVisF extends React.Component<GraphVisProps> {
  componentDidUpdate() {
    const { lastStepResult } = this.props;
    const graph = this.refs.graph as GraphWithFixedHighlight;
    graph.clearHighlight();
    switch (lastStepResult.step) {
      case StepName.Selection:
        const { alreadyVisitedNodes } = lastStepResult;
        Array.from(alreadyVisitedNodes.keys()).forEach((node) => {
          graph._setNodeHighlightedValue((node as any).id, true);
        });

        break;
      case StepName.Expansion:
        const subtree = lastStepResult.subtreeToExpand;
        this.recursivelyHighlightSubtree(graph, subtree);
        break;
      case StepName.Simulation:
        const { simulationPath } = lastStepResult;
        simulationPath.forEach((node) => graph._setNodeHighlightedValue(node.id, true));
        break;
      default:
        break;
    }
    graph.updateHighligth();
  }

  recursivelyHighlightSubtree(graph: GraphWithFixedHighlight, subtree: TreeNode) {
    graph._setNodeHighlightedValue(subtree.id, true);
    subtree.children.forEach((child) => {
      this.recursivelyHighlightSubtree(graph, child);
    });
  }

  render() {
    const { data } = this.props;
    allocateNodes(data);
    data.nodes.forEach((node) => {
      node.highlighted = true;
    });
    return (
      <div>
        <GraphWithFixedHighlight id="graph" data={data} config={graphConfig} ref="graph" />
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  lastStepResult: state.actualRunStep,
});

export const GraphVis = connect(mapStateToProps)(GraphVisF);
