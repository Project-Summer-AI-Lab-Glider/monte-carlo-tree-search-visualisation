import { Button } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { ToolbarProps } from "material-ui";
import styled from "styled-components";
import { GridItem } from "../CommonStyles/gridItem.styles";

export const StyledToolbar = styled(GridItem)<ToolbarProps>`
  display: flex;
  vertical-align: center;
`;

const btnColor = "#fabf18";
export const RunButton = styled(Button)`
  width: 150px;
  height: 30px;
  color: ${btnColor};
  &&& {
    margin: 10px;
    border: 4px solid ${btnColor};
    color: ${btnColor};
    background-color: white;
    text-align: center;
    display: flex;
    vertical-align: center;
    padding: 3px;
    outline: none;
    font-size: 12px;
    letter-spacing: 0.3px;
    justify-content: flex-start;
    border-radius: 0px;
  }
`;

export const RunCodeIcon = styled(PlayArrowIcon)`
  color: ${btnColor};
  &&& {
    font-size: 26px;
  }
`;
