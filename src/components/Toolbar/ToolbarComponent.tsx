import React from "react";
import { Runner } from "../../logic/algo/runner";
import { RunButton, RunCodeIcon, StyledToolbar } from "./styles";
import { ToolbarProps } from "./ToolbarProps";

function ToolbarF(props: ToolbarProps, ref?: React.Ref<HTMLDivElement>): JSX.Element {
  const algoHyperParams = {
    branchFactor: 3,
    treeDepth: 3,
    numRollout: 1,
    numIterations: 1,
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
