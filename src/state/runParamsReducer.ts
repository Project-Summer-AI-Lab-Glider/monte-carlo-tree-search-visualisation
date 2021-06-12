import { createAction, createReducer } from "@reduxjs/toolkit";
import { AlghorithmRunParams } from "../logic/algo/runner";

export const SetRunParams = createAction<AlghorithmRunParams>("runParams/set");

export const initialRunParams: AlghorithmRunParams = {
  branchFactor: 2,
  treeDepth: 3,
  numRollout: 5,
  numIterations: 5,
};

export const runParamsReducer = createReducer(initialRunParams, (builder) => {
  builder.addCase(SetRunParams, (state, action) => action.payload);
});
