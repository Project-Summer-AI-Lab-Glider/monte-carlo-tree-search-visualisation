import { Button } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { ToolbarProps } from "material-ui";
import styled from "styled-components";
import { GridItem } from "../CommonStyles/gridItem.styles";

export const StyledToolbar = styled(GridItem)<ToolbarProps>`
  display: flex;
  vertical-align: center;
`;

const runBtnColor = "#fabf18";
export const RunButton = styled(Button)`
  width: 150px;
  color: ${runBtnColor};
  &&& {
    margin: 10px;
    border: 4px solid ${runBtnColor};
    color: ${runBtnColor};
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
    margin: 2px;
  }
`;

export const RunCodeIcon = styled(PlayArrowIcon)`
  color: ${runBtnColor};
  &&& {
    font-size: 26px;
  }
`;

const nextBtnColor = "#36454C";
export const NextButton = styled(Button)`
  width: 180px;
  color: ${nextBtnColor};
  &&& {
    border: 4px solid ${nextBtnColor};
    color: ${nextBtnColor};
    background-color: white;
    text-align: center;
    display: flex;
    vertical-align: center;
    padding: 6px;
    outline: none;
    font-size: 14px;
    letter-spacing: 0.3px;
    border-radius: 0px;
    margin: 2px;
  }
`;

export const NextStepIcon = styled(SkipNextIcon)`
  color: ${nextBtnColor};
  &&& {
    font-size: 26px;
  }
`;
