import * as _ from "lodash";
import { AlgorithmRunner, MonteCarloTreeSearch } from "../algo/solver";

type StepToImplement = keyof AlgorithmRunner;
const functionsToImplement: Record<StepToImplement, string> = {
  choose: "Selects child for which algorithm will make rolout in current step",
  expand: "Expands selected path",
  select: "Selects next node",
  run: "Executes all steps needed to complete an aglo",
};

export class AlgorithmCodePreprocessor {
  static getAlgorithmCode(): string {
    const stepsWithComments = this.replaceImplementations();
    // TODO
    return MonteCarloTreeSearch.toString();
  }

  static replaceImplementations(): { [key in keyof MonteCarloTreeSearch]: unknown } {
    return Object.getOwnPropertyNames(MonteCarloTreeSearch.prototype)
      .filter((key) => key in functionsToImplement)
      .map((functionName) => {
        const functionDescription = functionsToImplement[functionName as StepToImplement];
        const functionImplementation = () => `/**${functionDescription}*/`;
        return { [functionName]: functionImplementation };
      })
      .reduce((acc, dict) => ({ ...acc, ...dict }), {}) as {
      [key in keyof MonteCarloTreeSearch]: unknown;
    }; // Fixme
  }
}
