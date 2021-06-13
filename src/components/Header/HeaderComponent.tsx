import React, { useState } from "react";
import Logo from "../../assets/app-logo.svg";
import { StyledHeader, StyledLabel, StyledLogo } from "./styles";
import { IconButton } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import { HelpModal } from "./HelpModal";

export function Header(): JSX.Element {
  const [openModal, setOpen] = useState(false);

  return (
    <StyledHeader>
      <StyledLogo src={Logo} alt="logo" />
      <StyledLabel>Monte Carlo How-To</StyledLabel>
      <IconButton
        style={{ marginLeft: "auto", marginRight: "8px", color: "lightgray" }}
        onClick={() => setOpen(true)}
      >
        <HelpIcon />
      </IconButton>
      <HelpModal open={openModal} onClose={() => setOpen(false)} />
    </StyledHeader>
  );
}
