import React from "react";
import { useAlgorithmRunnerWithSteps } from "../../hooks/useAlgorithmRunnerWithSteps";
import { CancelButton, CancelIcon, NextButton, NextStepIcon } from "./styles";
import { ToolbarMode } from "./ToolbarComponent";
import { BaseToolbarContentProps } from "./BaseToolbarContentProps";
import { useDispatch } from "react-redux";
import { SetStep } from "../../state/actualRunStepReducer";

export function StepByStepToolbarContent({ setToolbarMode }: BaseToolbarContentProps): JSX.Element {
  const generator = useAlgorithmRunnerWithSteps();
  const dispatch = useDispatch();

  function endStepByStepExecution() {
    setToolbarMode(ToolbarMode.Idle);
  }

  function runNextStep() {
    const stepResult = generator.next();
    console.log("Next step result: ", stepResult);
    if (stepResult.done) {
      endStepByStepExecution();
    } else {
      dispatch(SetStep(stepResult.value));
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
