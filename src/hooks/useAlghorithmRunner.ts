import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlghorithmRunParams, AlgorithmRunner } from "../logic/algo/runner";
import { ApplicationState } from "../state/appReducer";
import { SetRunParams } from "../state/runParamsReducer";

export function useAlgorithmRunner(): [
  repeatLastRun: () => void,
  runWithParams: (newParams: AlghorithmRunParams) => void
] {
  const algoHyperParams = useSelector((state: ApplicationState) => state.lastRunParams);
  const dispatch = useDispatch();

  const runWithParams = useCallback(
    (newParams: AlghorithmRunParams) => {
      const action = SetRunParams(newParams);
      AlgorithmRunner.run(newParams);
      dispatch(action);
    },
    [dispatch]
  );

  const repeatLastRun = () => AlgorithmRunner.run(algoHyperParams);
  return [repeatLastRun, runWithParams];
}
