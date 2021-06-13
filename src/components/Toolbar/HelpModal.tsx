import React, { useEffect, useState } from "react";
import { Modal } from "../WorkAreaDock/DefaultModal";
import { Help } from "./HelpComponent";

export function HelpModal({ open, onClose }: { open: boolean; onClose: () => void }): JSX.Element {
  return (
    <Modal open={open} onClose={onClose}>
      <Help />
    </Modal>
  );
}
