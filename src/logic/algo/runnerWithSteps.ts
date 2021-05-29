import { TreeBuilder, TreeBuildParams } from "../treeBuilder/treeBuilder";
import { TreeNode } from "../treeBuilder/treeNode";
import { MonteCarloTreeSearch, MonteCarloTreeSearchHyperParams } from "./solverWithSteps";

export type AlghorithmRunParams = TreeBuildParams & MonteCarloTreeSearchHyperParams;

export class AlgorithmRunnerWithSteps {
  // eslint-disable-next-line
  static run(runParams: AlghorithmRunParams) {
    console.log("Run started with params: ", runParams);
    const tree = TreeBuilder.build(runParams);
    const solver = new MonteCarloTreeSearch();
    return solver.run(tree, runParams);
  }
}
