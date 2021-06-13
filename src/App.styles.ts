import { createGlobalStyle } from "styled-components";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Scope One:400", "sans-serif"],
  },
});

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #fafafa;
    font-family: "Scope One";
    font-color: #36454c;
  }`;
