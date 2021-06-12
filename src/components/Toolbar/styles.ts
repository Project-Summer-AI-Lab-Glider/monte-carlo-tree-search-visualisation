import { Button, SvgIconTypeMap } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import CloseIcon from "@material-ui/icons/Close";
import { ToolbarProps } from "material-ui";
import styled from "styled-components";
import { GridItem } from "../CommonStyles/gridItem.styles";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export const StyledToolbar = styled(GridItem)<ToolbarProps>`
  display: flex;
  vertical-align: center;
`;

const ButtonFactory = (btnColor: string) => styled(Button)`
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

    span {
      text-align: start;
    }
  }
`;

const IconFactory = (
  iconColor: string,
  icon: OverridableComponent<SvgIconTypeMap<unknown, "svg">>
) => styled(icon)`
  color: ${iconColor};
  &&& {
    font-size: 26px;
  }
`;

const runBtnColor = "#fabf18";
const nextBtnColor = "#36454C";
const cancelBtnColor = "#ff4747";
export const RunButton = ButtonFactory(runBtnColor);
export const RunCodeIcon = IconFactory(runBtnColor, PlayArrowIcon);
export const NextButton = ButtonFactory(nextBtnColor);
export const NextStepIcon = IconFactory(nextBtnColor, SkipNextIcon);
export const CancelButton = ButtonFactory(cancelBtnColor);
export const CancelIcon = IconFactory(cancelBtnColor, CloseIcon);
