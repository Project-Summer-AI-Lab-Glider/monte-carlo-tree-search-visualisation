import { BackupStepResult } from "../../logic/algo/stepModels";
import { ComponentWithDescriptionOptions } from "./ComponentWithDescriptionOptions";
import { RenderTree } from "./RenderTreeHelper";
import { Title, Text } from "./styled";

export function BackupDescription({
  stepResult,
}: ComponentWithDescriptionOptions<BackupStepResult>): JSX.Element {
  const { actualVisitsNumber, actualReward, node } = stepResult;
  return (
    <>
      <Title>Backup</Title>
      <Text>All visits number: {actualVisitsNumber}</Text>
      <Text> Actual run reward: {actualReward}</Text>
      <RenderTree label="Actual tree state" treeRoot={node} />
    </>
  );
}
