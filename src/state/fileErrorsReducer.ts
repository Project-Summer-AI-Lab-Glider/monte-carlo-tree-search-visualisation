import { createAction, createReducer } from "@reduxjs/toolkit";
import { AlghorithmRunParams } from "../logic/algo/runner";
import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";

export type CompilationError = monacoEditor.languages.typescript.Diagnostic;
export const SetFileErrors = createAction<CompilationError[]>("fileErrors/set");
export const ClearFileErrors = createAction("fileErrors/clear");

export const initialParams: CompilationError[] = [];
export const fileErrorsReducer = createReducer(initialParams, (builder) => {
  builder
    .addCase(SetFileErrors, (state, action) => action.payload)
    .addCase(ClearFileErrors, (state, action) => []);
});
