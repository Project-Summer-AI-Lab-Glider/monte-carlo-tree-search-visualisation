import { TreeBuilder, TreeBuildParams } from "../treeBuilder/treeBuilder";
import { TreeNode } from "../treeBuilder/treeNode";
import { MonteCarloTreeSearch, MonteCarloTreeSearchHyperParams } from "./solver";

export type AlghorithmRunParams = TreeBuildParams & MonteCarloTreeSearchHyperParams;

export class AlgorithmRunner {
  static run(runParams: AlghorithmRunParams): TreeNode {
    console.log("Run started with params: ", runParams);
    const tree = TreeBuilder.build(runParams);
    const solver = new MonteCarloTreeSearch();
    return solver.run(tree, runParams);
  }
}
