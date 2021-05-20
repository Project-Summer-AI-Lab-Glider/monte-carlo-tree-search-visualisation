import React from "react";
import { AlgorithmRunMode, useAlgorithmRunner } from "../../hooks/useAlghorithmRunner";
import { NextButton, NextStepIcon, RunButton, RunCodeIcon, StyledToolbar } from "./styles";
import { ToolbarProps } from "./ToolbarProps";

function ToolbarF(props: ToolbarProps, ref?: React.Ref<HTMLDivElement>): JSX.Element {
  const [repeatLastRun] = useAlgorithmRunner();
  return (
    <StyledToolbar {...props} ref={ref}>
      <RunButton onClick={() => repeatLastRun({ type: AlgorithmRunMode.PredefinedAlgorithm })}>
        <RunCodeIcon />
        <span>Repeat last run</span>
      </RunButton>

      <NextButton onClick={repeatLastRun}>
        <NextStepIcon />
        <span>Next step</span>
      </NextButton>
    </StyledToolbar>
  );
}

export const Toolbar = React.forwardRef(ToolbarF);
