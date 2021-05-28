import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlghorithmRunParams, AlgorithmRunnerWithSteps } from "../logic/algo/runnerWithSteps";
import { ApplicationState } from "../state/appReducer";
import { SetRunParams } from "../state/runParamsReducer";

export function useAlgorithmRunnerWithSteps(): [
  repeatLastRun: () => void,
  runWithParams: (newParams: AlghorithmRunParams) => void,
  lastRunResult: number
] {
  const algoHyperParams = useSelector((state: ApplicationState) => state.lastRunParams);
  const [lastRunResult, setLastRunResult] = useState<number>(0);

  const dispatch = useDispatch();

  const executeAlgorithm = useCallback(
    (algoParams: AlghorithmRunParams) => {
      const targeLeaf = AlgorithmRunnerWithSteps.run(algoParams);
      setLastRunResult(targeLeaf.reward ?? 0);
    },
    [setLastRunResult]
  );

  const runWithParams = useCallback(
    (newParams: AlghorithmRunParams) => {
      executeAlgorithm(newParams);
      const action = SetRunParams(newParams);
      dispatch(action);
    },
    [dispatch, executeAlgorithm]
  );

  const repeatLastRun = () => executeAlgorithm(algoHyperParams);

  return [repeatLastRun, runWithParams, lastRunResult];
}
