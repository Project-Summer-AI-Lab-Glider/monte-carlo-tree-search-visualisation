import { SelectionStepResult } from "../../logic/algo/stepModels";
import { ComponentWithDescriptionOptions } from "./ComponentWithDescriptionOptions";
import { RenderTree } from "./RenderTreeHelper";
import { Title, Text } from "./styled";

export function SelectionDescription({
  stepResult,
}: ComponentWithDescriptionOptions<SelectionStepResult>): JSX.Element {
  const { selectedNodeToVisit, alreadyVisitedNodes } = stepResult;
  return (
    <>
      <Title>Selection</Title>
      <RenderTree label="Node to visit: " treeRoot={selectedNodeToVisit} />
      <Text>Already visited nodes</Text>
      {Array.from(alreadyVisitedNodes.keys()).map((node) => (
        <Text>
          {node.id}: {alreadyVisitedNodes.get(node)}
        </Text>
      ))}
    </>
  );
}
