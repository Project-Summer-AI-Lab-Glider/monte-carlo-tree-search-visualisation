import ReactMarkdown from "react-markdown";

const markdown = `
  
## Monte Carlo Tree Search

Here you will find all the necessary information to start using this platform.

---

### Code editor

After reading the theory, try implementing Monte Carlo Tree Search on your own. 
To do that, fill in the TODOs in the code and implement the steps described in theory.

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

### Visualization

You can scale the graph by scrolling or rearrange it by dragging and dropping single nodes if you need.

---

### Actual step description

This window is active in step-by-step mode of running the algorithm, and contains all the necesary information about the step being executed. It will help you understand Monte Carlo Tree Search even better!

`;

export function HelpContent(): JSX.Element {
  return <ReactMarkdown children={markdown} />;
}
