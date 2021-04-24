import { ubcKernel } from "./kernels";
import { TreeNode } from "../treeBuilder/treeNode";

export interface MonteCarloTreeSearchHyperParams {
  kernel?: (meanNodeValue: number, visitsOfNode: number, visitsOfParent: number) => number;
  numRollout: number;
  numIterations: number;
}

export interface AlgorithmRunner {
  run(root: TreeNode, hyperParams: MonteCarloTreeSearchHyperParams): TreeNode;
  choose(node: TreeNode): null;
  select(node: TreeNode): null;
  expand(node: TreeNode): null;
}
export class MonteCarloTreeSearch implements AlgorithmRunner {
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
