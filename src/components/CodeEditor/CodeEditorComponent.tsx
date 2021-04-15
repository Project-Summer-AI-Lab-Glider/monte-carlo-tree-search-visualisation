import React from "react";
import MonacoEditor from "react-monaco-editor";
import { CodeEditorProps } from "./CodeEditorProps";
import { StyledCodeEditor } from "./styles";

function CodeEditorF(props: CodeEditorProps, ref?: React.Ref<HTMLDivElement>): JSX.Element {
  return (
    <StyledCodeEditor {...props} ref={ref}>
      <MonacoEditor language="typescript" />
    </StyledCodeEditor>
  );
}

export const CodeEditor = React.forwardRef(CodeEditorF);
