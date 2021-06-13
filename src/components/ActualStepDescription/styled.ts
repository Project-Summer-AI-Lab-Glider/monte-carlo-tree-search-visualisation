import styled from "styled-components";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ArrowRight from "@material-ui/icons/ChevronRight";
import ArrowDown from "@material-ui/icons/KeyboardArrowDown";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon";

export const Title = styled.span`
  font-size: 130%;
  color: #36454c;
  font-weight: 800;
  display: block;
  text-align: center;
  margin: 10px;
`;

export const Text = styled.span`
  font-size: 100%;
  color: #36454c;
  font-weight: 300;
  display: block;
  margin: 10px;
`;

const IconFactory = (
  icon: OverridableComponent<SvgIconTypeMap<unknown, "svg">>,
  fontSize = '100%'
) => styled(icon)`
  color: #36454c;
  &&& {
    font-size: ${fontSize};
  }
`;

export const EndIcon = IconFactory(HighlightOffIcon, '15px');
export const ExpandIcon = IconFactory(ArrowRight);
export const CollapseIcon = IconFactory(ArrowDown);
