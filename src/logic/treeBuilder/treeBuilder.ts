import * as _ from "lodash";
import { TreeNode } from "./treeNode";

export interface TreeBuildParams {
  branchFactor: number; // number of childrens for each node
  treeDepth: number; // number of levels except root
}

export class TreeBuilder {
  static build({ branchFactor, treeDepth }: TreeBuildParams): TreeNode {
    if (treeDepth === 1) {
      const subtree = _.range(0, branchFactor).map(() => {
        const nodeReward = Math.random() - 0.5; // js random return values from 0 to 1, so here I'm mapping it to appropriate range
        return new TreeNode([], nodeReward);
      });
      const root = new TreeNode(subtree);
      return root;
    }
    const subtree = _.range(0, branchFactor).map(() =>
      this.build({ branchFactor, treeDepth: treeDepth - 1 })
    );
    return new TreeNode(subtree);
  }
}
