import { SelectionStepResult } from "../../logic/algo/stepModels";
import { ComponentWithDescriptionOptions } from "./ComponentWithDescriptionOptions";
import { RenderTree } from "./RenderTreeHelper";
import { Title } from "./styled";

export function SelectionDescription({
  stepResult,
}: ComponentWithDescriptionOptions<SelectionStepResult>): JSX.Element {
  const { selectedNodeToVisit } = stepResult;
  return (
    <>
      <Title>Selection</Title>
      <RenderTree label="Node to visit: " treeRoot={selectedNodeToVisit} />
    </>
  );
}
