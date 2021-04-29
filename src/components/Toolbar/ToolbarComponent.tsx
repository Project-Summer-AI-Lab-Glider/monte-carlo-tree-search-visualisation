import React from "react";
import { Runner } from "../../logic/algo/runner";
import { RunButton, RunCodeIcon, StyledToolbar } from "./styles";
import { ToolbarProps } from "./ToolbarProps";

function ToolbarF(props: ToolbarProps, ref?: React.Ref<HTMLDivElement>): JSX.Element {
  const algoHyperParams = {
    branchFactor: 8,
    treeDepth: 5,
    numRollout: 5,
    numIterations: 5,
  };
  return (
    <StyledToolbar {...props} ref={ref}>
      <RunButton onClick={() => Runner.run(algoHyperParams)}>
        <RunCodeIcon />
        <span>Run code</span>
      </RunButton>
    </StyledToolbar>
  );
}

export const Toolbar = React.forwardRef(ToolbarF);
