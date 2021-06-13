import { HelpContent } from "./HelpContent";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Scope One:400", "sans-serif"],
  },
});

export function Help(): JSX.Element {
  return (
    <div
      style={{
        margin: "15px",
        padding: "30px",
        overflowY: "scroll",
        height: "400px",
        width: "600px",
        fontFamily: "Scope One",
        color: "#36454C",
        textAlign: "justify",
      }}
    >
      <HelpContent />
    </div>
  );
}
