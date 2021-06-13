import { SimulationStepResult } from "../../logic/algo/stepModels";
import { ComponentWithDescriptionOptions } from "./ComponentWithDescriptionOptions";
import { RenderTree } from "./RenderTreeHelper";
import { Title, Text } from "./styled";

export function SimulationDescription({
  stepResult,
}: ComponentWithDescriptionOptions<SimulationStepResult>): JSX.Element {
  const { reward, simulationPath } = stepResult;
  return (
    <>
      <Title>Simulation</Title>
      <Text>Actual reward: {reward}</Text>
      <Text>Visited path: </Text>
      {simulationPath.map((node) => (
        <RenderTree label="Path link: " treeRoot={node} />
      ))}
    </>
  );
}
