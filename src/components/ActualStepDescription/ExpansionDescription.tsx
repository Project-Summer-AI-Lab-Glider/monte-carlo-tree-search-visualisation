import { ExpansionStepResult } from "../../logic/algo/stepModels";
import { ComponentWithDescriptionOptions } from "./ComponentWithDescriptionOptions";
import { RenderTree } from "./RenderTreeHelper";
import { Title } from "./styled";

export function ExpansionDescription({
  stepResult,
}: ComponentWithDescriptionOptions<ExpansionStepResult>): JSX.Element {
  const { subtreeToExpand: expandedNode } = stepResult;
  return (
    <>
      <Title>Expansion</Title>
      <RenderTree label="Subtree to be expanded: " treeRoot={expandedNode} />
    </>
  );
}
