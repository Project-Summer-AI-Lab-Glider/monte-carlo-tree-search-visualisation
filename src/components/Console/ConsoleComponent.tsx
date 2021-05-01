import * as _ from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { useAlgorithmRunner } from "../../hooks/useAlghorithmRunner";
import { ConsoleLogic } from "../../logic/console/consoleCommandHandler";
import { AlgorithmCommand } from "../../logic/console/consoleCommands";
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

  const [content, setContent] = useState("");

  const [, runAlgoWithParams, lastRunResult] = useAlgorithmRunner();
  
  
  useEffect(() => {
    setContent(prev => `${prev}\nAlgorithm finished search. Biggest reward in tree is ${lastRunResult}\n`);
  }, [lastRunResult]);

  const onContentChange = useCallback(
    (editorContent: string) => {
      const shouldExecuteCmd = editorContent.endsWith("\n");
      if (!shouldExecuteCmd) {
        return;
      }
      const lines = editorContent.split("\n");
      const command = lines[lines.length - 2]; // last line is always empty
      const commandObj = ConsoleLogic.parseCommand(command);
      if (_.isNil(commandObj)) {
        return;
      }
      switch (commandObj?.code) {
        case AlgorithmCommand.RunAlgorithm:
          runAlgoWithParams(commandObj.runParams);
          break;
        default:
          break;
      }
      setContent((prev) => `${prev}${command}\nCommand ${command} was successfully executed ...\n`);
    },
    [runAlgoWithParams, setContent]
  );

  return (
    <StyledConsole {...props} ref={ref}>
      <MonacoEditor
        value={content}
        options={editorOptions}
        onChange={onContentChange}
        language={CONSOLE_SYNTAX}
      />
    </StyledConsole>
  );
}

export const Console = React.forwardRef(ConsoleF);
