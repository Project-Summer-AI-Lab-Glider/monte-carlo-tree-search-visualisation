import * as _ from "lodash";
import { createNodeId } from "../../components/AlgorithmVisualiationWindow/AlgorithmVisualiationWindowComponent";
import { TreeNode } from "./treeNode";

export interface TreeBuildParams {
  branchFactor: number; // number of childrens for each node
  treeDepth: number; // number of levels except root
}

export class TreeBuilder {
  static build(
    { branchFactor, treeDepth }: TreeBuildParams,
    ordinalNumber = 0,
    parentNodeId = "Root"
  ): TreeNode {
    const rootId = createNodeId(ordinalNumber, parentNodeId);
    if (treeDepth === 1) {
      const subtree = _.range(0, branchFactor).map((_, index) => {
        const nodeReward = Math.random() - 0.5; // js random return values from 0 to 1, so here I'm mapping it to appropriate range
        return new TreeNode([], createNodeId(index, rootId), nodeReward);
      });
      const root = new TreeNode(subtree, rootId);
      return root;
    }
    const subtree = _.range(0, branchFactor).map((_, index) =>
      this.build({ branchFactor, treeDepth: treeDepth - 1 }, index, rootId)
    );
    return new TreeNode(subtree, rootId);
  }
}
