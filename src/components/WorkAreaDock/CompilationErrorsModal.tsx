import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../state/appReducer";
import { Title } from "./styles";
import { Modal } from "./DefaultModal";
import { Divider } from "@material-ui/core";
import { CompilationErrorDescription } from "./CompilationErrorDescription";

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
