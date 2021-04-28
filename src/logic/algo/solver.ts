import { TreeNode } from "../treeBuilder/treeNode";
import { ubcKernel } from "./kernels";

export interface MonteCarloTreeSearchHyperParams {
  kernel?: (meanNodeValue: number, visitsOfNode: number, visitsOfParent: number) => number;
  numRollout: number;
  numIterations: number;
}

export interface Solver {
  run(root: TreeNode, hyperParams: MonteCarloTreeSearchHyperParams): TreeNode;
  select(node: TreeNode): Array<TreeNode>;
  choose(node: TreeNode): TreeNode;
  expand(node: TreeNode): void;
}

export type SolverFunction = {
  [key in keyof Solver]: Solver[key];
}[keyof Solver];

export type StepToImplementName = keyof Solver;

export class MonteCarloTreeSearch implements Solver {
  private kernel: NonNullable<MonteCarloTreeSearchHyperParams["kernel"]> = ubcKernel;

  private nodeRewards: Map<TreeNode, number> = new Map();

  private nodeVisits: Map<TreeNode, number> = new Map();

  private nodeChildren: Map<TreeNode, Array<TreeNode>> = new Map();

  run(root: TreeNode, hyperParams: MonteCarloTreeSearchHyperParams): TreeNode {
    while (true) {
      for (let i = 0; i < hyperParams.numIterations; i += 1) {
        this.singleRun(root, hyperParams);
      }
      root = this.choose(root);
      if (root.children.length === 0) {
        return root;
      }
    }
  }

  singleRun(root: TreeNode, hyperParams: MonteCarloTreeSearchHyperParams): void {
    this.kernel = hyperParams.kernel ?? this.kernel;
    const path = this.select(root);
    const leaf = path[path.length - 1];
    this.expand(leaf);
    let reward = 0;
    for (let i = 0; i < hyperParams.numRollout; i += 1) {
      reward += this.simulate(leaf);
    }
    this.backup(path, reward);
  }

  select(node: TreeNode): Array<TreeNode> {
    const path: Array<TreeNode> = [];
    while (true) {
      path.push(node);
      if (!this.nodeChildren.has(node)) {
        return path;
      }
      if (this.nodeChildren.get(node)!.length === 0) {
        return path;
      }
      let unexploredNodes: Array<TreeNode> = this.nodeChildren.get(node)!;
      unexploredNodes = unexploredNodes.filter(
        (unexploredNode) => !this.nodeChildren.has(unexploredNode)
      );
      if (unexploredNodes.length > 0) {
        const n: TreeNode = unexploredNodes.pop()!;
        path.push(n);
        return path;
      }
      node = this.uctSelect(node)!;
    }
  }

  choose(node: TreeNode): TreeNode {
    if (node.children.length === 0) {
      throw Error("Choose method called on terminal node!");
    }

    if (!this.nodeChildren.has(node)) {
      return node.findRandomChild();
    }
    return Array.from(this.nodeChildren.get(node)!).reduce((prev, current) =>
      this.score(prev) > this.score(current) ? prev : current
    );
  }

  score(node: TreeNode): number {
    if (node.children.length === 0) {
      return Number.NEGATIVE_INFINITY;
    }
    return this.nodeRewards.get(node)! / this.nodeVisits.get(node)!;
  }

  expand(node: TreeNode): void {
    if (!this.nodeChildren.has(node)) {
      this.nodeChildren.set(node, node.children);
    }
  }

  backup(path: Array<TreeNode>, reward: number): void {
    path.forEach((node) => {
      const actualVisitsNumber = this.nodeVisits.get(node) ?? 0 + 1;
      this.nodeVisits.set(node, actualVisitsNumber);
      const actualReward = this.nodeRewards.get(node) ?? 0 + reward;
      this.nodeRewards.set(node, actualReward);
    });
  }

  simulate(node: TreeNode): number {
    while (true) {
      if (node.children.length === 0) {
        return node.reward ?? 0;
      }
      node = node.findRandomChild();
    }
  }

  uctSelect(node: TreeNode): TreeNode | undefined {
    const isAllChildrenExpanded = this.nodeChildren
      .get(node)!
      .some((singleNode) => this.nodeChildren.has(singleNode));

    if (!isAllChildrenExpanded) {
      return undefined;
    }
    const visitsOfParent = this.nodeVisits.get(node);
    return Array.from(this.nodeChildren.get(node)!).reduce((prev, current) =>
      this.calcKernel(prev, visitsOfParent!) > this.calcKernel(current, visitsOfParent!)
        ? prev
        : current
    );
  }

  calcKernel(childNode: TreeNode, visitsOfParent: number): number {
    const meanNodeValue = this.nodeRewards.get(childNode)! / this.nodeVisits.get(childNode)!;
    const visitsOfNode = this.nodeVisits.get(childNode)!;
    return ubcKernel(meanNodeValue, visitsOfNode, visitsOfParent);
  }
}
