import { TreeBuilder } from "../treeBuilder/treeBuilder";
import { AlghorithmRunParams } from "./runner";
import { MonteCarloTreeSearchWithSteps } from "./solverWithSteps";
import { StepResult } from "./stepModels";

export class AlgorithmRunnerWithSteps {
  static createStepGenerator(runParams: AlghorithmRunParams): Generator<StepResult, void, unknown> {
    console.log("Created generator for run with params: ", runParams);

    const tree = TreeBuilder.build(runParams);

    const solver = new MonteCarloTreeSearchWithSteps();

    return solver.run(tree, runParams);
  }
}
