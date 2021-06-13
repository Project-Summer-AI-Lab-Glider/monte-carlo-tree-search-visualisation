import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import { useState } from "react";
import { monaco } from "react-monaco-editor";
import { useDispatch } from "react-redux";
import { ClearFileErrors, SetFileErrors } from "../state/fileErrorsReducer";

export function useTypescriptEditor(): [
  setEditor: (editor: monacoEditor.editor.IStandaloneCodeEditor) => void,
  compile: () => void,
  code: string
] {
  const [editor, setEditor] = useState<monacoEditor.editor.IStandaloneCodeEditor>();
  const [compiledCode, setCompiledCode] = useState<string>("");
  const dispatch = useDispatch();

  async function getErrorsFromFile(
    compiler: monacoEditor.languages.typescript.TypeScriptWorker,
    fileName: string
  ): Promise<monacoEditor.languages.typescript.Diagnostic[]> {
    const semanticDiagnostics = await compiler.getSemanticDiagnostics(fileName);
    const ERROR_CATEGORY = 1; // from api docs
    return semanticDiagnostics.filter((diagnostic) => diagnostic.category === ERROR_CATEGORY);
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
      dispatch(ClearFileErrors());
      const compiledModels = await compiler.getEmitOutput(codeModel.uri.toString());
      const mainCode = compiledModels.outputFiles[0].text;
      // const action = SetCompiledCode(mainCode);
      setCompiledCode(mainCode);
      // dispatch(action)
    }
  }
  return [setEditor, compile, compiledCode];
}
