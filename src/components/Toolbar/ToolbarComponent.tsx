import React from "react";
import { useAlgorithmRunner } from "../../hooks/useAlghorithmRunner";
import { RunButton, RunCodeIcon, StyledToolbar } from "./styles";
import { ToolbarProps } from "./ToolbarProps";

function ToolbarF(props: ToolbarProps, ref?: React.Ref<HTMLDivElement>): JSX.Element {
  const [repeatLastRun] = useAlgorithmRunner();
  return (
    <StyledToolbar {...props} ref={ref}>
      <RunButton onClick={repeatLastRun}>
        <RunCodeIcon />
        <span>Repeat last run</span>
      </RunButton>
    </StyledToolbar>
  );
}

export const Toolbar = React.forwardRef(ToolbarF);
