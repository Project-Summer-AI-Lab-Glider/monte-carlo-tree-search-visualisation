import { createAction, createReducer } from "@reduxjs/toolkit";

export const SetCompiledCode = createAction<string>("compiledCode/set");

export const compiledCodeReducer = createReducer("", (builder) => {
  builder.addCase(SetCompiledCode, (state, action) => action.payload);
});
