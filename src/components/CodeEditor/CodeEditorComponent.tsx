import React from "react";
import MonacoEditor from "react-monaco-editor";
import { MonteCarloTreeSearch } from "../../logic/algo/solver";
import { AlgorithmCodePreprocessor } from "../../logic/codePreprocessor/codePreprocessor";
import { CodeEditorProps } from "./CodeEditorProps";
import { StyledCodeEditor } from "./styles";

function CodeEditorF(props: CodeEditorProps, ref?: React.Ref<HTMLDivElement>): JSX.Element {
  return (
    <StyledCodeEditor {...props} ref={ref}>
      <MonacoEditor language="typescript" value={AlgorithmCodePreprocessor.getAlgorithmCode()} />
    </StyledCodeEditor>
  );
}

export const CodeEditor = React.forwardRef(CodeEditorF);
