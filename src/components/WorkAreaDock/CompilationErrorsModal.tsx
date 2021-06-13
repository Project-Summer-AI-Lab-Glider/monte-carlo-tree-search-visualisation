import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../state/appReducer";
import { CompilationError } from "../../state/fileErrorsReducer";
import { ErrorText, Title } from "./styles";
import { Modal } from "./DefaultModal";
import { Divider } from "@material-ui/core";

function CompilationErrorDescription({
  error,
  key,
}: {
  error: CompilationError;
  key: string;
}): JSX.Element {
  return <ErrorText key={key}>Error: {error.messageText}</ErrorText>;
}

export function CompilationErrorsModal(): JSX.Element {
  const errors = useSelector((state: ApplicationState) => state.fileErrors);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(errors.length !== 0);
  }, [errors]);
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Title>File cannot be compiled due to compilation errors</Title>
      <Divider />
      {errors.map((error) => (
        <CompilationErrorDescription
          key={`${error.start}_${error.messageText.toString().substring(0, 5)}`}
          error={error}
        />
      ))}
    </Modal>
  );
}
