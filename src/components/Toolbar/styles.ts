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

const BaseButtonFactory = (btnColor: string) => styled(Button)`
  width: 150px;
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
    margin: 2px;
  }
`;

const runBtnColor = "#fabf18";
const nextBtnColor = "#36454C";
export const RunButton = BaseButtonFactory(runBtnColor);
export const NextButton = BaseButtonFactory(nextBtnColor);

export const RunCodeIcon = styled(PlayArrowIcon)`
  color: ${runBtnColor};
  &&& {
    font-size: 26px;
  }
`;

export const NextStepIcon = styled(SkipNextIcon)`
  color: ${nextBtnColor};
  &&& {
    font-size: 26px;
  }
`;
