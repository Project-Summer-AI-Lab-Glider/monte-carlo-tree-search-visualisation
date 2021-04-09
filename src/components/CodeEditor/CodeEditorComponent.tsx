import React from "react";
import { HtmlElementProps } from "../../utlis";

interface CodeEditorProps extends HtmlElementProps<HTMLDivElement> {}

function CodeEditorF(props: CodeEditorProps, ref?: React.Ref<HTMLDivElement>): JSX.Element {
  return (
    <div {...props} ref={ref}>
      Code editor goes here
    </div>
  );
}

export const CodeEditor = React.forwardRef(CodeEditorF);
