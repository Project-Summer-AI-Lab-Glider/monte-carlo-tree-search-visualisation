import { monaco } from "react-monaco-editor";
import { RunParams } from "../../logic/algo/runner";
import { StepToImplementName } from "../../logic/algo/solver";

export enum AlgorithmCommand {
  RunAlgorithm = "run_algo",
  RunTests = "run_tests",
}
export enum TestType {
  RunAll = "run_all",
  RunFailed = "run_failed",
}
// #region Run algo
export interface RunAlgortimCommand {
  code: AlgorithmCommand.RunAlgorithm;
  runParams: RunParams;
}

export const RunAlgortimCommandParamOrder: (keyof Omit<RunParams, "kernel">)[] = [
  "branchFactor",
  "numIterations",
  "numRollout",
  "treeDepth",
];

export const RunAlghorithmCompletion = {
  label: AlgorithmCommand.RunAlgorithm,
  kind: monaco.languages.CompletionItemKind.Function,
  insertText: `${AlgorithmCommand.RunAlgorithm}(${RunAlgortimCommandParamOrder.map(
    (paramName, idx) => `\${${idx}:${paramName}}`
  ).join(", ")})`,
  insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
};

// #endregion
export interface RunTestCommand {
  code: AlgorithmCommand.RunTests;
  testType: TestType | StepToImplementName;
}

export type ConsoleCommand = RunAlgortimCommand | RunTestCommand;
