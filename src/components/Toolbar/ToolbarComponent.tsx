import React, { useMemo, useState } from "react";
import { saveAs } from "file-saver";
import { IdleToolbarContent } from "./IdleToolbarContent";
import { StepByStepToolbarContent } from "./StepByStepToolbarContent";
import { StyledToolbar } from "./styles";
import { ToolbarProps } from "./ToolbarProps";
import { Button, IconButton } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import { HelpModal } from "./HelpModal";

export enum ToolbarMode {
  StepByStepExecution = "stepByStepExecution",
  Idle = "idle",
}

function ToolbarF(props: ToolbarProps, ref?: React.Ref<HTMLDivElement>): JSX.Element {
  const [toolbarMode, setToolbarMode] = useState<ToolbarMode>(ToolbarMode.Idle);
  const [openModal, setOpen] = useState(false);

  const ModeMap = {
    [ToolbarMode.StepByStepExecution]: <StepByStepToolbarContent setToolbarMode={setToolbarMode} />,
    [ToolbarMode.Idle]: <IdleToolbarContent setToolbarMode={setToolbarMode} />,
  };

  return (
    <StyledToolbar {...props} ref={ref}>
      {ModeMap[toolbarMode]}
      <IconButton style={{ color: "lightgray" }} onClick={() => setOpen(true)}>
        <HelpIcon />
      </IconButton>
      <HelpModal open={openModal} onClose={() => setOpen(false)} />
    </StyledToolbar>
  );
}

export const Toolbar = React.forwardRef(ToolbarF);
