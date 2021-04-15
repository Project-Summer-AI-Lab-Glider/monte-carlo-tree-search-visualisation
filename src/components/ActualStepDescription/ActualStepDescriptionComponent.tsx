import React from "react";
import { ActualStepDescriptionProps } from "./ActualStepDescriptionProps";
import { StyledActualStepDescription } from "./styles";

function ActualStepDescriptionF(
  props: ActualStepDescriptionProps,
  ref?: React.Ref<HTMLDivElement>
): JSX.Element {
  return (
    <StyledActualStepDescription {...props} ref={ref}>
      Actual step description goes here
    </StyledActualStepDescription>
  );
}

export const ActualStepDescription = React.forwardRef(ActualStepDescriptionF);
