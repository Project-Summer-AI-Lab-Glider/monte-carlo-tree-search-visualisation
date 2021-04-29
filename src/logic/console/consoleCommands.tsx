import { monaco } from "react-monaco-editor";
import { AlghorithmRunParams } from "../algo/runner";
import { StepToImplementName } from "../algo/solver";

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
  runParams: AlghorithmRunParams;
}

export const RunAlgortimCommandParamOrder: (keyof Omit<AlghorithmRunParams, "kernel">)[] = [
  "branchFactor",
  "numIterations",
  "numRollout",
  "treeDepth",
];

export const RunAlghorithmCompletion = {
  label: AlgorithmCommand.RunAlgorithm,
  kind: monaco.languages.CompletionItemKind.Function,
  insertText: `${AlgorithmCommand.RunAlgorithm}(${RunAlgortimCommandParamOrder.map(
    (paramName, idx) => `\${${idx + 1}:${paramName}}`
  ).join(", ")})`,
  insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
};

// #endregion
export interface RunTestCommand {
  code: AlgorithmCommand.RunTests;
  testType: TestType | StepToImplementName;
}

export type ConsoleCommand = RunAlgortimCommand | RunTestCommand;
