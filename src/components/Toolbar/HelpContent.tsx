import ReactMarkdown from "react-markdown";

const markdown = `

---
### Console

There is a console in the right bottom corner, where you can run your code with custom parameters.

To run the algorithm implementation, type \`run_algo(branchFactor, numIterations, numRollout, treeDepth)\`

The parameters are:
*   _branchFactor_: how many children each node will have
*   _numIterations_: the algorithm will repeat _numIterations_ times to find the best path
*   _numRollout_: number of simulations for a single node during an iteration
*   _treeDepth_: doesn't need explanation, does it?
---
`;

export function HelpContent(): JSX.Element {
  return <ReactMarkdown children={markdown} />;
}
