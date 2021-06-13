import Tabs from "@material-ui/core/Tabs";
import styled from "styled-components";
import { GridItem } from "../CommonStyles/gridItem.styles";
import { CodeEditorProps } from "./CodeEditorProps";

export const StyledWorkArea = styled(GridItem)<CodeEditorProps>`
  height: 40vh;
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

export const Title = styled.span`
  font-size: 20px;
  color: #36454c;
  font-weight: 800;
  display: block;
  text-align: center;
  margin-bottom: 10px;
`;
export const ErrorText = styled.div`
  color: #36454c;
  border: 1px solid #ff4747;
  padding: 10px;
  margin: 5px 10px;
  border-radius: 5px;
  &:hover {
    background-color: whitesmoke;
  }
`;

export const ErrorList = styled.div`
  height: 20vh;
  overflow-y: scroll;
`;
