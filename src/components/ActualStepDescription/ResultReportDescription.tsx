import { ResultReportStepResult } from "../../logic/algo/stepModels";
import { ComponentWithDescriptionOptions } from "./ComponentWithDescriptionOptions";
import { Title, Text } from "./styled";

export function ResultReportDescription({
  stepResult,
}: ComponentWithDescriptionOptions<ResultReportStepResult>): JSX.Element {
  const { root } = stepResult;
  return (
    <>
      <Title>Run result</Title>
      <Text>Run reward: {root.reward}</Text>
    </>
  );
}
