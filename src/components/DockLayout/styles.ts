import styled from "styled-components";
import GridLayout, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(GridLayout);

export const StyledDockLayout = styled(ReactGridLayout)<
  GridLayout.ReactGridLayoutProps & GridLayout.WidthProviderProps
>`
  margin: 5px;
`;
