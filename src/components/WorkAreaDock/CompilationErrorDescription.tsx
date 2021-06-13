import React from "react";
import { CompilationError } from "../../state/fileErrorsReducer";
import { ErrorText } from "./styles";

export function CompilationErrorDescription({
  error,
  key,
}: {
  error: CompilationError;
  key: string;
}): JSX.Element {
  return <ErrorText key={key}>Error: {error.messageText}</ErrorText>;
}
