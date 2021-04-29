import * as _ from "lodash";
import React, { useCallback, useMemo } from "react";
import MonacoEditor from "react-monaco-editor";
import { ConsoleLogic } from "./consoleCommandHandler";
import { initCompletion } from "./consoleCompletionConfig";
import { ConsoleProps } from "./ConsoleProps";
import { CONSOLE_SYNTAX, initSyntax, mapLineNumbers } from "./consoleSyntaxConfig";
import { StyledConsole } from "./styles";

initSyntax();
initCompletion();
function ConsoleF(props: ConsoleProps, ref?: React.Ref<HTMLDivElement>): JSX.Element {
  const editorOptions = useMemo(
    () => ({
      lineNumbers: mapLineNumbers,
      folding: false,
    }),
    []
  );

  const onContentChange = useCallback((editorContent: string) => {
    const shouldExecuteCmd = editorContent.endsWith("\n");
    if (!shouldExecuteCmd) {
      return;
    }
    const lines = editorContent.split("\n");
    const command = lines[lines.length - 2]; // last line is always empty
    ConsoleLogic.execute(command);
  }, []);

  return (
    <StyledConsole {...props} ref={ref}>
      <MonacoEditor options={editorOptions} onChange={onContentChange} language={CONSOLE_SYNTAX} />
    </StyledConsole>
  );
}

export const Console = React.forwardRef(ConsoleF);
