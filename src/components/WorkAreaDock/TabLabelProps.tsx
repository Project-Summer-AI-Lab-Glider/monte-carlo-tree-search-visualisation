import React from "react";
import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

interface TabLabelProps {
  icon: OverridableComponent<SvgIconTypeMap<unknown, "svg">>;
  text: string;
}
export function TabLabel({ icon: Icon, text }: TabLabelProps): JSX.Element {
  return (
    <>
      <span style={{ marginRight: 10 }}>
        <Icon />
      </span>
      <span style={{ fontFamily: "Scope One", fontSize: "16px" }}>{text}</span>
    </>
  );
}
