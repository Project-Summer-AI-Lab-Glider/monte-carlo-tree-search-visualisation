import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import React, { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { AlgorithmRunMode, useAlgorithmRunner } from "../../hooks/useAlgorithmRunner";
import { useTypescriptEditor } from "../../hooks/useTypescriptEditor";
import { AlgorithmCodePreprocessor } from "../../logic/codePreprocessor/codePreprocessor";
import { IconButton } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import { RunButton, RunCodeIcon, StyledToolbar } from "../Toolbar/styles";
import { CompilationErrorsModal } from "./CompilationErrorsModal";

export function CodeEditor(): JSX.Element {
  const [setEditor, compileAndRun, compiledCode, saveCode] = useTypescriptEditor();

  const [repeatLastRun] = useAlgorithmRunner();

  const [content, setEditorContent] = useState(AlgorithmCodePreprocessor.getAlgorithmCode());

  function onEditorMount(editor: monacoEditor.editor.IStandaloneCodeEditor) {
    setEditor(editor);
  }

  useEffect(() => {
    if (compiledCode) {
      repeatLastRun({
        type: AlgorithmRunMode.UserAlgorithm,
        userCode: compiledCode,
      });
    }
  }, [compiledCode, repeatLastRun]);

  return (
    <>
      <StyledToolbar>
        <RunButton onClick={compileAndRun}>
          <RunCodeIcon />
          <span>Compile & run</span>
        </RunButton>
        <CompilationErrorsModal />
        <IconButton
          size="small"
          style={{ marginLeft: "auto", color: "lightgray" }}
          onClick={saveCode}
        >
          <GetAppIcon />
        </IconButton>
      </StyledToolbar>
      <MonacoEditor
        language="typescript"
        value={content}
        editorDidMount={onEditorMount}
        onChange={setEditorContent}
      />
    </>
  );
}
