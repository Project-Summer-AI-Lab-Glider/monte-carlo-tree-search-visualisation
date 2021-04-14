import React from "react";
import { ConsoleProps } from "./ConsoleProps";
import { StyledConsole } from "./styles";

function ConsoleF(props: ConsoleProps, ref?: React.Ref<HTMLDivElement>): JSX.Element {
  return (
    <StyledConsole {...props} ref={ref}>
      Console component goes here
    </StyledConsole>
  );
}

export const Console = React.forwardRef(ConsoleF);
