import React from "react";
import { AlgorithmVisualiationWindowProps } from "./AlgorithmVisualiationWindowProps";
import { StyledAlghorithmWindow } from "./styles";

function AlgorithmVisualiationWindowF(
  props: AlgorithmVisualiationWindowProps,
  ref?: React.Ref<HTMLDivElement>
): JSX.Element {
  return (
    <StyledAlghorithmWindow {...props} ref={ref}>
      Algorithm visualiation goes here
    </StyledAlghorithmWindow>
  );
}

export const AlgorithmVisualiationWindow = React.forwardRef(AlgorithmVisualiationWindowF);
