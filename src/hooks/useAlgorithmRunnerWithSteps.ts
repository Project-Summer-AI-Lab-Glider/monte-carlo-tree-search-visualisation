import { useState } from "react";
import { AlghorithmRunParams, AlgorithmRunnerWithSteps } from "../logic/algo/runnerWithSteps";
import { initialRunParams } from "../state/runParamsReducer";

export function useAlgorithmRunnerWithSteps(): Generator<unknown, unknown, unknown> {
  const [generator, setGenerator] = useState(AlgorithmRunnerWithSteps.run(initialRunParams));
  return generator;
}
