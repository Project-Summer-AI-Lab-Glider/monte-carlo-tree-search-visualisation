import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import { useState } from "react";
import { monaco } from "react-monaco-editor";
import { useDispatch } from "react-redux";
import { ClearFileErrors, SetFileErrors } from "../state/fileErrorsReducer";

export function useTypescriptEditor(): [
  setEditor: (editor: monacoEditor.editor.IStandaloneCodeEditor) => void,
  compile: () => void,
  code: string,
  saveCode: () => void
] {
  const [editor, setEditor] = useState<monacoEditor.editor.IStandaloneCodeEditor>();
  const [compiledCode, setCompiledCode] = useState<string>("");
  const dispatch = useDispatch();
  const [notCompiledCode, setNotCompiledCode] = useState<string>("");
  async function getErrorsFromFile(
    compiler: monacoEditor.languages.typescript.TypeScriptWorker,
    fileName: string
  ): Promise<monacoEditor.languages.typescript.Diagnostic[]> {
    const semanticDiagnostics = await compiler.getSemanticDiagnostics(fileName);
    const ERROR_CATEGORY = 1; // from api docs
    return semanticDiagnostics.filter((diagnostic) => diagnostic.category === ERROR_CATEGORY);
  }

  function saveCode() {
    const codeModel = editor?.getModel();
    if (codeModel) {
      const fileWithCode = codeModel.getValue();
      const FileSaver = require("file-saver");
      const blob = new Blob([fileWithCode], { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, "mcts_code.tsx");
    }
  }

  async function compile() {
    const codeModel = editor?.getModel();
    if (codeModel) {
      const compiler = await monaco.languages.typescript
        .getTypeScriptWorker()
        .then((getWorker) => getWorker(codeModel.uri));

      const fileName = codeModel.uri.toString();
      const errors = await getErrorsFromFile(compiler, fileName);
      if (errors.length !== 0) {
        dispatch(SetFileErrors(errors));
        return;
      }
      setNotCompiledCode(fileName);
      dispatch(ClearFileErrors());
      const compiledModels = await compiler.getEmitOutput(codeModel.uri.toString());
      const mainCode = compiledModels.outputFiles[0].text;
      // const action = SetCompiledCode(mainCode);
      setCompiledCode(mainCode);
      // dispatch(action)
    }
  }
  return [setEditor, compile, compiledCode, saveCode];
}
