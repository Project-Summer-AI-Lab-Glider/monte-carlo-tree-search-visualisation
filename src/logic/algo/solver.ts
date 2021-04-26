import { TreeNode } from "../treeBuilder/treeNode";
import { ubcKernel } from "./kernels";

export interface MonteCarloTreeSearchHyperParams {
  kernel?: (meanNodeValue: number, visitsOfNode: number, visitsOfParent: number) => number;
  numRollout: number;
  numIterations: number;
}

export interface Solver {
  run(root: TreeNode, hyperParams: MonteCarloTreeSearchHyperParams): TreeNode;
  choose(node: TreeNode): null;
  select(node: TreeNode): null;
  expand(node: TreeNode): null;
}

export type SolverFunction = {
  [key in keyof Solver]: Solver[key];
}[keyof Solver];

export type StepToImplementName = keyof Solver;

export class MonteCarloTreeSearch implements Solver {
  private kernel: NonNullable<MonteCarloTreeSearchHyperParams["kernel"]> = ubcKernel;

  run(root: TreeNode, hyperParams: MonteCarloTreeSearchHyperParams): TreeNode {
    this.kernel = hyperParams.kernel ?? this.kernel;
    return new TreeNode();
  }

  choose(node: TreeNode): null {
    return null;
  }

  select(node: TreeNode): null {
    return null;
  }

  expand(node: TreeNode): null {
    return null;
  }
}
