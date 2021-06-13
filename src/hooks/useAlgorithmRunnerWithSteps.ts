import { useState } from "react";
import { AlgorithmRunnerWithSteps } from "../logic/algo/runnerWithSteps";
import { StepResult } from "../logic/algo/stepModels";
import { initialRunParams } from "../state/runParamsReducer";

export function useAlgorithmRunnerWithSteps(): Generator<StepResult, void, unknown> {
  // TODO: params should depend on state
  const [generator] = useState(AlgorithmRunnerWithSteps.createStepGenerator(initialRunParams));
  return generator;
}
