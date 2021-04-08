import React from "react";
import { HtmlElementProps } from "../../utlis";

interface ConsoleProps extends HtmlElementProps<HTMLDivElement> {}

function ConsoleF(props: ConsoleProps, ref?: React.Ref<HTMLDivElement>): JSX.Element {
  return (
    <div {...props} ref={ref}>
      Console component goes here
    </div>
  );
}

export const Console = React.forwardRef(ConsoleF);
