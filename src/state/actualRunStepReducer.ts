import { createAction, createReducer } from "@reduxjs/toolkit";
import { StepResult } from "../logic/algo/stepModels";

export const SetStep = createAction<StepResult>("actualStep/set");
export const ResetStepByStepRun = createAction("actualStep/reset");

const initialRunParams: StepResult = {} as StepResult;

export const actualRunStepReducer = createReducer(initialRunParams, (builder) => {
  builder
    .addCase(SetStep, (state, action) => action.payload)
    .addCase(ResetStepByStepRun, () => initialRunParams);
});
