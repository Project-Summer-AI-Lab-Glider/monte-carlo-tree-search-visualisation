import React, { cloneElement, ReactElement } from "react";
import { Layout } from "react-grid-layout";
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import { StyledDockLayout } from "./styles";

interface DockLayoutProps {
  children: ReactElement[];
}

export function DockLayout({ children }: DockLayoutProps): JSX.Element {
  const colWidth = 2;
  const firstRowHeight = 3.5;
  const secondRowHeight = 0.3;
  const thirdRowHeight = 2;
  const dockConfiguration: Layout[] = [
    { i: "leftUpperCorner", x: 0, y: 0, w: colWidth, h: firstRowHeight, static: true },
    { i: "rightUpperCorner", x: colWidth, y: 0, w: colWidth, h: firstRowHeight, static: true },
    { i: "leftMiddlePart", x: 0, y: firstRowHeight, w: colWidth, h: secondRowHeight, static: true },
    {
      i: "rightMiddlePart",
      x: colWidth,
      y: firstRowHeight,
      w: colWidth,
      h: secondRowHeight,
      static: true,
    },
    {
      i: "leftLowerCorner",
      x: 0,
      y: firstRowHeight + secondRowHeight,
      w: colWidth,
      h: thirdRowHeight,
      static: true,
    },
    {
      i: "rigthLowerCorner",
      x: colWidth,
      y: firstRowHeight + secondRowHeight,
      w: colWidth,
      h: thirdRowHeight,
      static: true,
    },
  ];

  if (children.length > dockConfiguration.length) {
    throw new Error(
      `More children that allowed were passed. Allowed count is ${dockConfiguration.length}`
    );
  }

  return (
    <StyledDockLayout className="layout" layout={dockConfiguration} cols={colWidth * 2}>
      {children.map((child, index) =>
        cloneElement(child, {
          key: dockConfiguration[index].i,
        })
      )}
    </StyledDockLayout>
  );
}
