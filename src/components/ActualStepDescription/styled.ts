import styled from "styled-components";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ArrowRight from "@material-ui/icons/ChevronRight";
import ArrowDown from "@material-ui/icons/KeyboardArrowDown";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon";

export const Title = styled.span`
  font-size: 25px;
  color: #36454c;
  font-weight: 800;
  display: block;
  text-align: center;
`;

export const Text = styled.span`
  font-size: 20px;
  color: #36454c;
  font-weight: 300;
  display: block;
`;

const IconFactory = (
  icon: OverridableComponent<SvgIconTypeMap<unknown, "svg">>,
  fontSize = 20
) => styled(icon)`
  color: #36454c;
  &&& {
    font-size: ${fontSize}px;
  }
`;

export const EndIcon = IconFactory(HighlightOffIcon, 15);
export const ExpandIcon = IconFactory(ArrowRight);
export const CollapseIcon = IconFactory(ArrowDown);
