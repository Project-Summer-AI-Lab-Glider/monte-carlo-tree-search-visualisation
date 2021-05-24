import { combineReducers } from "redux";
import { AlghorithmRunParams } from "../logic/algo/runner";
import { runParamsReducer } from "./runParamsReducer";

export interface ApplicationState {
  lastRunParams: AlghorithmRunParams;
}

export const appReducer = combineReducers<ApplicationState>({
  lastRunParams: runParamsReducer,
});
