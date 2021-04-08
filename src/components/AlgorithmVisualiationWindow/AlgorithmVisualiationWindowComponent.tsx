import React from "react";
import { HtmlElementProps } from "../../utlis";

interface AlgorithmVisualiationWindowProps extends HtmlElementProps<HTMLDivElement> {}

function AlgorithmVisualiationWindowF(
  props: AlgorithmVisualiationWindowProps,
  ref?: React.Ref<HTMLDivElement>
): JSX.Element {
  return (
    <div {...props} ref={ref}>
      Algorithm visualiation goes here
    </div>
  );
}

export const AlgorithmVisualiationWindow = React.forwardRef(AlgorithmVisualiationWindowF);
