import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import React, { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { AlgorithmRunMode, useAlgorithmRunner } from "../../hooks/useAlgorithmRunner";
import { useTypescriptEditor } from "../../hooks/useTypescriptEditor";
import { AlgorithmCodePreprocessor } from "../../logic/codePreprocessor/codePreprocessor";
import { RunButton, RunCodeIcon } from "../Toolbar/styles";
import { CompilationErrorsModal } from "./CompilationErrorsModal";

export function CodeEditor(): JSX.Element {
  const [setEditor, compileAndRun, compiledCode] = useTypescriptEditor();

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
      <RunButton onClick={compileAndRun}>
        <RunCodeIcon />
        <span>Compile & run</span>
      </RunButton>
      <CompilationErrorsModal />
      <MonacoEditor
        language="typescript"
        value={content}
        editorDidMount={onEditorMount}
        onChange={setEditorContent}
      />
    </>
  );
}
