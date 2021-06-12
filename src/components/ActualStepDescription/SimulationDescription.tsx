import { SimulationStepResult } from "../../logic/algo/stepModels";
import { ComponentWithDescriptionOptions } from "./ComponentWithDescriptionOptions";
import { Title, Text } from "./styled";

export function SimulationDescription({
  stepResult,
}: ComponentWithDescriptionOptions<SimulationStepResult>): JSX.Element {
  const { reward } = stepResult;
  return (
    <>
      <Title>Simulation</Title>
      <Text>Last simulation reward: {reward}</Text>
    </>
  );
}
