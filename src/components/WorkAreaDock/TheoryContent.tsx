import ReactMarkdown from "react-markdown";

const markdown = `
  
## Monte Carlo Tree Search

Monte Carlo Tree Search is a heuristic search algorithm. It is used in decision processes 
e.g. in the AlphaGo playing by Artificial Intelligence. In cases like Go, there are too many
options to calculate reward for every path. MCTS enables AI to predict the most valuable
option (with the highest probability of winning) with the use of smart approximations.

---

### How to Monte Carlo?

Let’s imagine that we have a tree (like this one on your left hand). The main goal of MCTS
is to decide about the next step. So if we are in the root, algorithm help us choose
(probably) the best child node to go. Consequently, algorithm finds the most profitable path
in the tree. Knowing the compute power and time limit, we can determine how precisely an
algorithm should calc this probability. Obviously - the more power and time, the higher
precision.

 
At the beginning we have to assume that we know the current number of visits (*nodeVisits* 🤝),
the currently predicted reward (*nodeRewards* 🏆) and children (*nodeChildren* 👨‍👩‍👧‍👦) for each already
visited node. We also have a technique to choose between a couple of child nodes (tree
policy).

---

### Steps

**1. Selection** - we are in the root (it’s a root of currently considering
subtree). Now according to the tree policy we choose one of the child nodes. Temporary
it’s our leaf node.


**2. Expansion** - we have the leaf node. Now we have to make a note of this
node and its children in the *nodeChildren* 👨‍👩‍👧‍👦 structure.

**3. Simulation** - we have the leaf node and know its children. Score for this
leaf node is assumed as zero right now. We want to know its real score. So let’s make a
random simulation! We dive into the tree, randomly picking the next node among its
children. If the current node is terminal, we update the score.

**4. Backup** - after *numRollout* 🌀 simulations we increment the *nodeVisits* 🤝 for the
leaf node and update the *nodeRewards* 🏆.  
 
After *numIterations* 🔢 times of this process it’s possible to predict the best path to go!

---
Happy coding! 🙂
`;

export function TheoryContent(): JSX.Element {
  return <ReactMarkdown children={markdown} />;
}
