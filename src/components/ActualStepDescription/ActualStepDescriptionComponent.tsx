import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../state/appReducer";
import { ActualStepDescriptionProps } from "./ActualStepDescriptionProps";
import { StepDescription } from "./ComponentWithDescriptionOptions";
import { StyledActualStepDescription } from "./styles";

function ActualStepDescriptionF(
  props: ActualStepDescriptionProps,
  ref?: React.Ref<HTMLDivElement>
): JSX.Element {
  const actualStepResult = useSelector((state: ApplicationState) => state.actualRunStep);
  return (
    <StyledActualStepDescription {...props} ref={ref}>
      <StepDescription stepResult={actualStepResult} />
    </StyledActualStepDescription>
  );
}

export const ActualStepDescription = React.forwardRef(ActualStepDescriptionF);
