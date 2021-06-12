import { SelectionStepResult } from "../../logic/algo/stepModels";
import { ComponentWithDescriptionOptions } from "./ComponentWithDescriptionOptions";
import { RenderTree } from "./RenderTreeHelper";
import { Title } from "./styled";

export function SelectionDescription({
  stepResult,
}: ComponentWithDescriptionOptions<SelectionStepResult>): JSX.Element {
  const { selectedPath } = stepResult;
  return (
    <>
      <Title>Selection</Title>
      {selectedPath.map((node) => (
        <RenderTree treeRoot={node} />
      ))}
    </>
  );
}
