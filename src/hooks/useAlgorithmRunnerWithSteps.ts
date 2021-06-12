import { useState } from "react";
import { AlghorithmRunParams, AlgorithmRunnerWithSteps } from "../logic/algo/runnerWithSteps";
import { initialRunParams } from "../state/runParamsReducer";

export function useAlgorithmRunnerWithSteps(): Generator<unknown, unknown, unknown> {
  // TODO: params should depend on state
  const [generator] = useState(AlgorithmRunnerWithSteps.createStepGenerator(initialRunParams));

  return generator;
}
