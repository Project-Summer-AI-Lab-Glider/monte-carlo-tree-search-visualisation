import { TheoryContent } from "./TheoryContent";
import WebFont from 'webfontloader';

WebFont.load({
   google: {
     families: ['Scope One:400', 'sans-serif']
   }
});

export function AlgorithmDescription(): JSX.Element {
  return (
    <div
      style={{
        margin: "15px",
        padding: "30px",
        overflowY: "scroll",
        height: "75%",
        fontFamily: "Scope One",
        color: "#36454C",
        textAlign: "justify"
      }}
    >
      <TheoryContent />
    </div>)

}
