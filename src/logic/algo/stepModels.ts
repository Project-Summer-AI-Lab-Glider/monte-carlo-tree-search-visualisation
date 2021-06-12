import { TreeNode } from "../treeBuilder/treeNode";

export enum StepName {
  Selection = "selection",
  Expansion = "expansion",
  Simulation = "simulation",
  Backup = "backup",
  ResultReport = "resultReport",
}

export type StepResult =
  | SelectionStepResult
  | ExpansionStepResult
  | SimulationStepResult
  | BackupStepResult
  | ResultReportStepResult;

export interface SelectionStepResult {
  step: StepName.Selection;
  selectedPath: TreeNode[];
}

export interface ExpansionStepResult {
  step: StepName.Expansion;
  expandedNode: TreeNode;
}

export interface SimulationStepResult {
  step: StepName.Simulation;
  reward: number;
}

export interface BackupStepResult {
  step: StepName.Backup;
  node: TreeNode;
  actualVisitsNumber: number;
  actualReward: number;
}

export interface ResultReportStepResult {
  step: StepName.ResultReport;
  root: TreeNode;
}
