import React from "react";
import { AlgorithmRunMode, useAlgorithmRunner } from "../../hooks/useAlgorithmRunner";
import { RunButton, RunCodeIcon } from "./styles";
import { ToolbarMode } from "./ToolbarComponent";
import { BaseToolbarContentProps } from "./BaseToolbarContentProps";

export function IdleToolbarContent({ setToolbarMode }: BaseToolbarContentProps): JSX.Element {
  const [repeatLastRun] = useAlgorithmRunner();
  return (
    <>
      <RunButton onClick={() => repeatLastRun({ type: AlgorithmRunMode.PredefinedAlgorithm })}>
        <RunCodeIcon />
        <span>Run full algo</span>
      </RunButton>
      <RunButton onClick={() => setToolbarMode(ToolbarMode.StepByStepExecution)}>
        <RunCodeIcon />
        <span>Run step by step</span>
      </RunButton>
    </>
  );
}
