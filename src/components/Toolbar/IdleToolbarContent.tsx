import React, { useState } from "react";
import { AlgorithmRunMode, useAlgorithmRunner } from "../../hooks/useAlgorithmRunner";
import { RunButton, RunCodeIcon } from "./styles";
import { ToolbarMode } from "./ToolbarComponent";
import { BaseToolbarContentProps } from "./BaseToolbarContentProps";
import { AlgorithmResultModal } from "./AlgorithmResultModal";

export function IdleToolbarContent({ setToolbarMode }: BaseToolbarContentProps): JSX.Element {
  const [repeatLastRun, _, lastRunResult] = useAlgorithmRunner();
  const [openModal, setOpen] = useState(false);

  const runOnClickListener = () => {
    repeatLastRun({ type: AlgorithmRunMode.PredefinedAlgorithm });
    setOpen(true);
  };

  return (
    <>
      <RunButton onClick={runOnClickListener}>
        <RunCodeIcon />
        <span>Run full algo</span>
      </RunButton>
      <AlgorithmResultModal
        open={openModal}
        onClose={() => setOpen(false)}
        content={lastRunResult.toString()}
      />
      <RunButton onClick={() => setToolbarMode(ToolbarMode.StepByStepExecution)}>
        <RunCodeIcon />
        <span>Run step by step</span>
      </RunButton>
    </>
  );
}
