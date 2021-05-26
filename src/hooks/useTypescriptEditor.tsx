import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import { useState } from "react";
import { monaco } from "react-monaco-editor";
import { useDispatch } from "react-redux";
import { SetCompiledCode } from "../state/compiledCodeReducer";

export function useTypescriptEditor(): [
  setEditor: (editor: monacoEditor.editor.IStandaloneCodeEditor) => void,
  compile: () => void,
  code: string
] {
  const [editor, setEditor] = useState<monacoEditor.editor.IStandaloneCodeEditor>();
  const [compiledCode, setCompiledCode] = useState<string>("");
  // const dispatch = useDispatch();

  async function compile() {
    const codeModel = editor?.getModel();
    if (codeModel) {
      const compiler = await monaco.languages.typescript
        .getTypeScriptWorker()
        .then((getWorker) => getWorker(codeModel.uri));
      const compiledModels = await compiler.getEmitOutput(codeModel.uri.toString());
      const mainCode = compiledModels.outputFiles[0].text;
      // const action = SetCompiledCode(mainCode);
      setCompiledCode(mainCode);
      // dispatch(action)
    }
  }
  return [setEditor, compile, compiledCode];
}

// import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
// import { useState } from "react";
// import { monaco } from "react-monaco-editor";
// import { useDispatch, useSelector } from "react-redux";
// import { ApplicationState } from "../state/appReducer";
// import { SetCompiledCode } from "../state/compiledCodeReducer";

// export function useTypescriptEditor(): [
//   setEditor: (editor: monacoEditor.editor.IStandaloneCodeEditor) => void,
//   compile: () => void,
//   code: string
// ] {
//   const [editor, setEditor] = useState<monacoEditor.editor.IStandaloneCodeEditor>();
//   const compiledCode = useSelector((state: ApplicationState) => state.compiledCode);
//   const dispatch = useDispatch();

//   async function compile() {
//     const codeModel = editor?.getModel();
//     if (codeModel) {
//       const compiler = await monaco.languages.typescript
//         .getTypeScriptWorker()
//         .then(getWorker => getWorker(codeModel.uri));
//       const compiledModels = await compiler.getEmitOutput(codeModel.uri.toString());
//       const mainCode = compiledModels.outputFiles[0].text;
//       const action = SetCompiledCode(mainCode);
//       dispatch(action);
//     }
//   }
//   return [setEditor, compile, compiledCode];
// }
