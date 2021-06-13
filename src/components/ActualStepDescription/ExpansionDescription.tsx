import { ExpansionStepResult } from "../../logic/algo/stepModels";
import { ComponentWithDescriptionOptions } from "./ComponentWithDescriptionOptions";
import { RenderTree } from "./RenderTreeHelper";
import { Title } from "./styled";

export function ExpansionDescription({
  stepResult,
}: ComponentWithDescriptionOptions<ExpansionStepResult>): JSX.Element {
  const { expandedNode } = stepResult;
  return (
    <>
      <Title>Expansion</Title>
      <RenderTree treeRoot={expandedNode} />
    </>
  );
}
