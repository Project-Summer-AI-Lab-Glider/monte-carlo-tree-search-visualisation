import React, { useState } from "react";
import Logo from "../../assets/app-logo.svg";
import { StyledHeader, StyledLabel, StyledLogo } from "./styles";

export function Header(): JSX.Element {
  return (
    <StyledHeader>
      <StyledLogo src={Logo} alt="logo" />
      <StyledLabel>Monte Carlo How-To</StyledLabel>
    </StyledHeader>
  );
}
