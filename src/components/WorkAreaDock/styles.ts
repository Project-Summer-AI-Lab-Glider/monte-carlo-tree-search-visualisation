import styled from "styled-components";
import { GridItem } from "../CommonStyles/gridItem.styles";
import { CodeEditorProps } from "./CodeEditorProps";
import Tabs from "@material-ui/core/Tabs";

export const StyledWorkArea = styled(GridItem)<CodeEditorProps>`
  min-height: 80vh;
`;

export const TabHeader = styled(Tabs)`
  &&& {
    display: flex;
    justify-content: center;
    background-color: transparent;
    & > span {
      max-width: 40px;
      width: 100%;
      background-color: #635ee7;
    }
    & .MuiTab-wrapper {
      display: flex;
      flex-direction: row;
    }
  }
`;
