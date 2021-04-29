import React from "react";
import MonacoEditor from "react-monaco-editor";
import { AlgorithmCodePreprocessor } from "../../logic/codePreprocessor/codePreprocessor";

export function CodeEditor(): JSX.Element {
  return (
    <MonacoEditor language="typescript" value={AlgorithmCodePreprocessor.getAlgorithmCode()} />
  );
}
