import React from "react";
import { HtmlElementProps } from "../../utlis";

interface ActualStepDescriptionProps extends HtmlElementProps<HTMLDivElement> {}

function ActualStepDescriptionF(
  props: ActualStepDescriptionProps,
  ref?: React.Ref<HTMLDivElement>
): JSX.Element {
  return (
    <div {...props} ref={ref}>
      Actual step description goes here
    </div>
  );
}

export const ActualStepDescription = React.forwardRef(ActualStepDescriptionF);
