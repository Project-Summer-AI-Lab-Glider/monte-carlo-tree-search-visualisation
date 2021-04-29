import { monaco } from "react-monaco-editor";
import { RunAlghorithmCompletion } from "../../logic/console/consoleCommands";
import { CONSOLE_SYNTAX } from "./consoleSyntaxConfig";

export function initCompletion(): void {
  monaco.languages.registerCompletionItemProvider(CONSOLE_SYNTAX, {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);

      const suggestions = [
        {
          ...RunAlghorithmCompletion,
          range: {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          },
        },
      ];
      return { suggestions };
    },
  });
}
