import React, { useMemo, useState } from "react";
import { IdleToolbarContent } from "./IdleToolbarContent";
import { StepByStepToolbarContent } from "./StepByStepToolbarContent";
import { StyledToolbar } from "./styles";
import { ToolbarProps } from "./ToolbarProps";

export enum ToolbarMode {
  StepByStepExecution = "stepByStepExecution",
  Idle = "idle",
}

function ToolbarF(props: ToolbarProps, ref?: React.Ref<HTMLDivElement>): JSX.Element {
  const [toolbarMode, setToolbarMode] = useState<ToolbarMode>(ToolbarMode.Idle);

  const ModeMap = {
    [ToolbarMode.StepByStepExecution]: <StepByStepToolbarContent setToolbarMode={setToolbarMode} />,
    [ToolbarMode.Idle]: <IdleToolbarContent setToolbarMode={setToolbarMode} />,
  };

  return (
    <StyledToolbar {...props} ref={ref}>
      {ModeMap[toolbarMode]}
    </StyledToolbar>
  );
}

export const Toolbar = React.forwardRef(ToolbarF);
