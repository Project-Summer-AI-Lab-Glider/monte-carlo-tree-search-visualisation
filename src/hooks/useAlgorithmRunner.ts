import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlghorithmRunParams as AlgorithmRunParams, AlgorithmRunner } from "../logic/algo/runner";
import { ApplicationState } from "../state/appReducer";
import { SetRunParams } from "../state/runParamsReducer";

export enum AlgorithmRunMode {
  UserAlgorithm = "userAlgorithm",
  PredefinedAlgorithm = "predefinedAlgorithm",
}

interface RunWithPredefinedAlgoParams {
  type: AlgorithmRunMode.PredefinedAlgorithm;
}

interface RunWithUserAlgoParams {
  type: AlgorithmRunMode.UserAlgorithm;
  userCode: string;
}
type RunParams = RunWithPredefinedAlgoParams | RunWithUserAlgoParams;

export function useAlgorithmRunner(): [
  repeatLastRun: (params: RunParams) => void,
  runWithParams: (newParams: AlgorithmRunParams) => void,
  lastRunResult: number
] {
  const algoHyperParams = useSelector((state: ApplicationState) => state.lastRunParams);
  const [lastRunResult, setLastRunResult] = useState<number>(0);

  const dispatch = useDispatch();

  const executeAlgorithm = useCallback(
    (algoParams: AlgorithmRunParams & RunParams) => {
      let targetLeaf;
      switch (algoParams.type) {
        case AlgorithmRunMode.PredefinedAlgorithm:
          targetLeaf = AlgorithmRunner.runPredefinedAlgorithm(algoParams);
          break;
        case AlgorithmRunMode.UserAlgorithm:
          targetLeaf = AlgorithmRunner.runUserAlgorithm(algoParams, algoParams.userCode);
          break;
        default:
          throw Error("Not allowed type");
      }
      setLastRunResult(targetLeaf?.reward ?? 0);
    },
    [setLastRunResult]
  );

  const runWithParams = useCallback(
    (newParams: AlgorithmRunParams) => {
      executeAlgorithm({ ...newParams, type: AlgorithmRunMode.PredefinedAlgorithm });
      const action = SetRunParams(newParams);
      dispatch(action);
    },
    [dispatch, executeAlgorithm]
  );

  const repeatLastRun = (params: RunParams) => executeAlgorithm({ ...params, ...algoHyperParams });

  return [repeatLastRun, runWithParams, lastRunResult];
}
