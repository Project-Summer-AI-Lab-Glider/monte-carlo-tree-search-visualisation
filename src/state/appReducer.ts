import { combineReducers } from "redux";
import { AlghorithmRunParams } from "../logic/algo/runner";
import { StepResult } from "../logic/algo/stepModels";
import { TreeNode } from "../logic/treeBuilder/treeNode";
import { actualRunStepReducer } from "./actualRunStepReducer";
import { compiledCodeReducer } from "./compiledCodeReducer";
import { CompilationError, fileErrorsReducer } from "./fileErrorsReducer";
import { runParamsReducer } from "./runParamsReducer";

export interface ApplicationState {
  lastRunParams: AlghorithmRunParams;
  compiledCode: string;
  actualRunStep: StepResult;
  fileErrors: CompilationError[];
}

export const appReducer = combineReducers<ApplicationState>({
  lastRunParams: runParamsReducer,
  compiledCode: compiledCodeReducer,
  actualRunStep: actualRunStepReducer,
  fileErrors: fileErrorsReducer,
});
