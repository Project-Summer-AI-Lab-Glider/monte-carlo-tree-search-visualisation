import { ubcKernel } from "./kernels";
import { TreeNode } from "../treeBuilder/treeNode";

export interface MonteCarloTreeSearchHyperParams {
  kernel?: (meanNodeValue: number, visitsOfNode: number, visitsOfParent: number) => number;
  numRollout: number;
  numIterations: number;
}

export class MonteCarloTreeSearch {
  private kernel: NonNullable<MonteCarloTreeSearchHyperParams["kernel"]> = ubcKernel;

  run(node: TreeNode, hyperParams: MonteCarloTreeSearchHyperParams): TreeNode {
    this.kernel = hyperParams.kernel ?? this.kernel;
    return new TreeNode();
  }

  static choose(node: TreeNode): null {
    return null;
  }

  static select(node: TreeNode): null {
    return null;
  }

  static expand(node: TreeNode): null {
    return null;
  }
}
