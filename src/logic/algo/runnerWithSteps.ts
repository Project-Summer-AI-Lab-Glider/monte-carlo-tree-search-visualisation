import { TreeBuilder, TreeBuildParams } from "../treeBuilder/treeBuilder";
import { TreeNode } from "../treeBuilder/treeNode";
import {
  MonteCarloTreeSearchWithSteps,
  MonteCarloTreeSearchHyperParams,
  BackupInformation,
} from "./solverWithSteps";

export type AlghorithmRunParams = TreeBuildParams & MonteCarloTreeSearchHyperParams;

export class AlgorithmRunnerWithSteps {
  static createStepGenerator(
    runParams: AlghorithmRunParams
  ): Generator<number | TreeNode | TreeNode[] | BackupInformation | undefined, void, unknown> {
    console.log("Created generator for run with params: ", runParams);

    const tree = TreeBuilder.build(runParams);

    const solver = new MonteCarloTreeSearchWithSteps();

    return solver.run(tree, runParams);
  }
}
