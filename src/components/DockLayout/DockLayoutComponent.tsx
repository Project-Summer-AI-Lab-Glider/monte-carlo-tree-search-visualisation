import React, { ReactChild } from "react";
import GridLayout from "react-grid-layout";

interface DockLayoutOptions {
  children: ReactChild[];
}

export function DockLayout({ children }: DockLayoutOptions): JSX.Element {
  const rowWidth = 12;
  const baseRowHeight = 2;
  const colCount = 2;
  const layout = children.map((_, index) => {
    const x = index % colCount;
    const y = index * baseRowHeight;
    const layoutBase = { i: index.toString(), x, y };
    if (index === children.length && index % colCount !== 0) {
      return { ...layoutBase, w: rowWidth, h: baseRowHeight / 2 };
    }
    return { ...layoutBase, w: rowWidth / colCount, h: baseRowHeight };
  });
  return (
    <GridLayout className="layout" layout={layout}>
      {children.map((child, index) => (
        <React.Fragment key={index.toString()} {...{ containerWidth: 1000 }}>
          {child}
        </React.Fragment>
      ))}
    </GridLayout>
  );
}
