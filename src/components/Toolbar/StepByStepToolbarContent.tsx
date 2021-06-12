import React from "react";
import { useAlgorithmRunnerWithSteps } from "../../hooks/useAlgorithmRunnerWithSteps";
import { CancelButton, CancelIcon, NextButton, NextStepIcon } from "./styles";
import { ToolbarMode } from "./ToolbarComponent";
import { BaseToolbarContentProps } from "./BaseToolbarContentProps";

export function StepByStepToolbarContent({ setToolbarMode }: BaseToolbarContentProps): JSX.Element {
  const generator = useAlgorithmRunnerWithSteps();

  function endStepByStepExecution() {
    setToolbarMode(ToolbarMode.Idle);
  }

  function runNextStep() {
    const nextStepResult = generator.next();
    console.log("Next step result: ", nextStepResult);
    if (nextStepResult.done) {
      endStepByStepExecution();
    }
  }

  return (
    <>
      <NextButton onClick={runNextStep}>
        <NextStepIcon />
        <span>Next step</span>
      </NextButton>
      <CancelButton onClick={endStepByStepExecution}>
        <CancelIcon />
        <span>Cancel run</span>
      </CancelButton>
    </>
  );
}
