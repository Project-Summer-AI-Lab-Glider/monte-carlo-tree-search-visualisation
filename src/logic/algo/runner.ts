import { TreeBuilder, TreeBuildParams } from "../treeBuilder/treeBuilder";
import { TreeNode } from "../treeBuilder/treeNode";
import { MonteCarloTreeSearch, MonteCarloTreeSearchHyperParams } from "./solver";

export type RunParams = TreeBuildParams & MonteCarloTreeSearchHyperParams;
export class Runner {
  static run(runParams: RunParams): TreeNode {
    console.log("Run started with params: ", runParams);
    const tree = TreeBuilder.build(runParams);
    const solver = new MonteCarloTreeSearch();
    console.log(solver.run(tree, runParams));
    return solver.run(tree, runParams);
  }
}
