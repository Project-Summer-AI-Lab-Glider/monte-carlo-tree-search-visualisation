import { combineReducers } from "redux";
import { AlghorithmRunParams } from "../logic/algo/runner";
import { compiledCodeReducer } from "./compiledCodeReducer";
import { runParamsReducer } from "./runParamsReducer";

export interface ApplicationState {
  lastRunParams: AlghorithmRunParams;
  compiledCode: string;
}

export const appReducer = combineReducers<ApplicationState>({
  lastRunParams: runParamsReducer,
  compiledCode: compiledCodeReducer,
});
