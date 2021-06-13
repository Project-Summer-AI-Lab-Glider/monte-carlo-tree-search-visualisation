import React from "react";
import { StepResult, StepName } from "../../logic/algo/stepModels";
import { BackupDescription } from "./BackupDescription";
import { ExpansionDescription } from "./ExpansionDescription";
import { NoStepsMade } from "./NoStepsMade";
import { ResultReportDescription } from "./ResultReportDescription";
import { SelectionDescription } from "./SelectionDescription";
import { SimulationDescription } from "./SimulationDescription";

export interface ComponentWithDescriptionOptions<T extends StepResult = StepResult> {
  stepResult: T;
}
export function StepDescription({ stepResult }: ComponentWithDescriptionOptions): JSX.Element {
  switch (stepResult.step) {
    case StepName.Selection:
      return <SelectionDescription stepResult={stepResult} />;
    case StepName.Expansion:
      return <ExpansionDescription stepResult={stepResult} />;
    case StepName.Simulation:
      return <SimulationDescription stepResult={stepResult} />;
    case StepName.Backup:
      return <BackupDescription stepResult={stepResult} />;
    case StepName.ResultReport:
      return <ResultReportDescription stepResult={stepResult} />;
    default:
      return <NoStepsMade />;
  }
}
