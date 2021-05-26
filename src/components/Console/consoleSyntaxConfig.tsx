import { monaco } from "react-monaco-editor";

export const CONSOLE_START_LINE = ">>";
export function mapLineNumbers(): string {
  return CONSOLE_START_LINE;
}

export const CONSOLE_SYNTAX = "consoleSyntaxHighlight";
export function initSyntax(): void {
  monaco.languages.register({ id: CONSOLE_SYNTAX });
  monaco.languages.setMonarchTokensProvider(CONSOLE_SYNTAX, {
    tokenizer: {
      root: [
        // main
        [/run[\w$]*/, "type.identifier"],

        // numbers
        [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
        [/\d+/, "number"],

        // strings
        [/"([^"\\]|\\.)*$/, "string.invalid"],
        [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],
      ],

      string: [
        [/[^\\"]+/, "string"],
        [/\\./, "string.escape.invalid"],
        [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
      ],
    },
    ignoreCase: false,
    brackets: [
      {
        open: "(",
        close: ")",
        token: "delimiter.parenthesis",
      },
    ],
  });
}
