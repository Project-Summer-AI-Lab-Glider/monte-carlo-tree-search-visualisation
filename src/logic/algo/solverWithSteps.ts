import { TreeNode } from "../treeBuilder/treeNode";
import { ubcKernel } from "./kernels";

import * as _ from "lodash";
import {
  BackupStepResult,
  ExpansionStepResult,
  SelectionStepResult,
  SimulationStepResult,
  ResultReportStepResult,
  StepName,
  StepResult,
} from "./stepModels";

export interface MonteCarloTreeSearchHyperParams {
  kernel?: (meanNodeValue: number, visitsOfNode: number, visitsOfParent: number) => number;
  numRollout: number;
  numIterations: number;
}

export class MonteCarloTreeSearchWithSteps {
  private kernel: NonNullable<MonteCarloTreeSearchHyperParams["kernel"]> = ubcKernel;

  private nodeRewards: Map<TreeNode, number> = new Map();

  private nodeVisits: Map<TreeNode, number> = new Map();

  private nodeChildren: Map<TreeNode, Array<TreeNode>> = new Map();

  *run(
    root: TreeNode,
    hyperParams: MonteCarloTreeSearchHyperParams
  ): Generator<StepResult, void, unknown> {
    while (true) {
      for (const i of _.range(0, hyperParams.numIterations)) {
        yield* this.singleRun(root, hyperParams);
      }

      root = this.choose(root);
      if (root.children.length === 0) {
        yield {
          step: StepName.ResultReport,
          root,
        };
      }
    }
  }

  *singleRun(
    root: TreeNode,
    hyperParams: MonteCarloTreeSearchHyperParams
  ): Generator<StepResult, void, unknown> {
    this.kernel = hyperParams.kernel ?? this.kernel;

    const path: TreeNode[] = [];
    yield* this.select(root, path);

    const leaf = path[path.length - 1];
    yield* this.expand(leaf);

    const reward = 0;
    yield* this.simulateNumRolloutsTimes(leaf, hyperParams.numRollout, reward);

    yield* this.backup(path, reward);
  }

  *select(node: TreeNode, path: TreeNode[]): Generator<SelectionStepResult> {
    while (true) {
      path.push(node);
      if (!this.nodeChildren.has(node)) {
        break;
      }
      if ((this.nodeChildren.get(node) ?? []).length === 0) {
        break;
      }
      let unexploredNodes: Array<TreeNode> = this.nodeChildren.get(node) ?? [];
      unexploredNodes = unexploredNodes.filter(
        (unexploredNode) => !this.nodeChildren.has(unexploredNode)
      );
      if (unexploredNodes.length > 0) {
        const unexploredNode: TreeNode | undefined = unexploredNodes.pop();
        if (unexploredNode) {
          path.push(unexploredNode);
        }
        break;
      }
      node = this.uctSelect(node);
    }
    yield {
      step: StepName.Selection,
      selectedPath: path,
    };
  }

  choose(node: TreeNode): TreeNode {
    if (node.children.length === 0) {
      throw Error("Choose method called on terminal node!");
    }

    if (!this.nodeChildren.has(node)) {
      return node.findRandomChild();
    }
    return Array.from(this.nodeChildren.get(node) ?? []).reduce((prev, current) =>
      this.score(prev) > this.score(current) ? prev : current
    );
  }

  score(node: TreeNode): number {
    if (node.children.length === 0) {
      return Number.NEGATIVE_INFINITY;
    }
    return this.nodeRewards.get(node) ?? 0 / (this.nodeVisits.get(node) ?? 1);
  }

  *expand(node: TreeNode): Generator<ExpansionStepResult> {
    if (!this.nodeChildren.has(node)) {
      this.nodeChildren.set(node, node.children);
      yield {
        step: StepName.Expansion,
        expandedNode: node,
      };
    }
  }

  *backup(path: Array<TreeNode>, reward: number): Generator<BackupStepResult> {
    for (let node of path) {
      const actualVisitsNumber = this.nodeVisits.get(node) ?? 0 + 1;
      this.nodeVisits.set(node, actualVisitsNumber);
      const actualReward = this.nodeRewards.get(node) ?? 0 + reward;
      this.nodeRewards.set(node, actualReward);
      yield {
        step: StepName.Backup,
        node,
        actualVisitsNumber,
        actualReward,
      };
    }
  }

  simulate(node: TreeNode): number {
    while (true) {
      if (node.children.length === 0) {
        return node.reward ?? 0;
      }
      node = node.findRandomChild();
    }
  }

  *simulateNumRolloutsTimes(
    leaf: TreeNode,
    numRollout: number,
    reward: number
  ): Generator<SimulationStepResult> {
    for (let i = 0; i < numRollout; i += 1) {
      reward += this.simulate(leaf);
      yield {
        step: StepName.Simulation,
        reward,
      };
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
}
