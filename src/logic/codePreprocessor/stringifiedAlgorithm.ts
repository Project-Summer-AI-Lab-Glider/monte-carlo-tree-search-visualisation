import { Opaque } from "../../utlis";
import { Solver, StepToImplementName } from "../algo/solver";

export const UserSolverName = "UserAlgorithmRunner";
export type TODO = Opaque<"TODO", string>;

export type UserSolver = {
  new (): Solver;
};
export function StringifyAlghorytm({
  choose,
  expand,
  select,
  run,
}: Record<StepToImplementName, TODO>): string {
  return `
  class TreeNode {
    constructor(public children: TreeNode[] = [], public reward?: number) {}
  
    findRandomChild(): TreeNode {
      return this.children[Math.floor(Math.random() * this.children.length)];
    }
  }
  
  interface MonteCarloTreeSearchHyperParams {
    kernel?: (meanNodeValue: number, visitsOfNode: number, visitsOfParent: number) => number;
    numRollout: number;
    numIterations: number;
  }
  
  interface Solver {
    run(root: TreeNode, hyperParams: MonteCarloTreeSearchHyperParams): TreeNode;
    select(node: TreeNode): TreeNode[];
    choose(node: TreeNode): TreeNode;
    expand(node: TreeNode): void;
  }
    
  type StepToImplementName = keyof Solver;
  
  class ${UserSolverName} {
   
    private nodeRewards: Map<TreeNode, number> = new Map();
  
    private nodeVisits: Map<TreeNode, number> = new Map();
  
    private nodeChildren: Map<TreeNode, Array<TreeNode>> = new Map();
  
    run(root: TreeNode, hyperParams: MonteCarloTreeSearchHyperParams): TreeNode {
      ${run}
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
      ${select}
    }
  
    choose(node: TreeNode): TreeNode {
       ${choose}
    }
  
    score(node: TreeNode): number {
      if (node.children.length === 0) {
        return Number.NEGATIVE_INFINITY;
      }
      return this.nodeRewards.get(node) ?? 0 / (this.nodeVisits.get(node) ?? 1);
    }
  
    expand(node: TreeNode): void {
      ${expand}
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
  
    uctSelect(node: TreeNode): TreeNode {
      const isAllChildrenExpanded = (this.nodeChildren.get(node) ?? []).every((singleNode) =>
        this.nodeChildren.has(singleNode)
      );
  
      if (!isAllChildrenExpanded) {
        throw Error("Selection is available only from fully expanded node!");
      }
      const visitsOfParent: number = this.nodeVisits.get(node) ?? 1;
      return Array.from(this.nodeChildren.get(node) ?? []).reduce((prev, current) =>
        this.calcKernel(prev, visitsOfParent) > this.calcKernel(current, visitsOfParent)
          ? prev
          : current
      );
    }
  
    calcKernel(childNode: TreeNode, visitsOfParent: number): number {
      const meanNodeValue =
        this.nodeRewards.get(childNode) ?? 0 / (this.nodeVisits.get(childNode) ?? 1);
      const visitsOfNode = this.nodeVisits.get(childNode) ?? 1;
      return this.kernel(meanNodeValue, visitsOfNode, visitsOfParent);
    }

    private kernel(
      meanNodeValue: number,
      visitsOfNode: number,
      visitsOfParent: number
    ): number {
      const explorationWeight = 0.1;
      const logVisitsOfParent = Math.log(visitsOfParent);
      if (visitsOfNode === 0){
        throw Error("Division by zero is immposible!");
      }
      return meanNodeValue + explorationWeight * Math.sqrt(logVisitsOfParent / visitsOfNode);
    };

  }
  `;
}
