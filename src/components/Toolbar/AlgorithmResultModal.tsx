import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import WebFont from "webfontloader";
import { Modal } from "../WorkAreaDock/DefaultModal";

WebFont.load({
  google: {
    families: ["Scope One:400", "sans-serif"],
  },
});

function GenerateContent({ content }: { content: string }): JSX.Element {
  const markdown = (
    <ReactMarkdown children={`Algorithm finished search. Biggest reward in tree is ${content}.`} />
  );
  return (
    <div
      style={{
        margin: "15px",
        padding: "30px",
        fontFamily: "Scope One",
        color: "#36454C",
        textAlign: "justify",
      }}
    >
      {markdown}
    </div>
  );
}

export function AlgorithmResultModal({
  open,
  onClose,
  content,
}: {
  open: boolean;
  onClose: () => void;
  content: string;
}): JSX.Element {
  return (
    <Modal open={open} onClose={onClose}>
      <GenerateContent content={content} />
    </Modal>
  );
}
