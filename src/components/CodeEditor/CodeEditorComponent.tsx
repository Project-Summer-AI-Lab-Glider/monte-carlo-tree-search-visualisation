import React from "react";
import MonacoEditor from "react-monaco-editor";
import { HtmlElementProps } from "../../utlis";

interface CodeEditorProps extends HtmlElementProps<HTMLDivElement> {}

function CodeEditorF(props: CodeEditorProps, ref?: React.Ref<HTMLDivElement>): JSX.Element {
  return (
    <div {...props} ref={ref}>
      <MonacoEditor language="typescript" />
    </div>
  );
}

export const CodeEditor = React.forwardRef(CodeEditorF);
