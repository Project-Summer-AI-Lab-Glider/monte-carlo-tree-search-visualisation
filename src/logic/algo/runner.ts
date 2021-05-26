import { UserSolver, UserSolverName } from "../codePreprocessor/stringifiedAlgorithm";
import { TreeBuilder, TreeBuildParams } from "../treeBuilder/treeBuilder";
import { TreeNode } from "../treeBuilder/treeNode";
import { MonteCarloTreeSearch, MonteCarloTreeSearchHyperParams, Solver } from "./solver";

export type AlghorithmRunParams = TreeBuildParams & MonteCarloTreeSearchHyperParams;

export class AlgorithmRunner {
  static runPredefinedAlgorithm(runParams: AlghorithmRunParams): TreeNode {
    return this.runAlgorithm(new MonteCarloTreeSearch(), runParams);
  }

  private static runAlgorithm(solver: Solver, runParams: AlghorithmRunParams) {
    const tree = TreeBuilder.build(runParams);
    return solver.run(tree, runParams);
  }

  static runUserAlgorithm(runParams: AlghorithmRunParams, userCode: string): TreeNode {
    // add validation
    const userObjects = this.translateToObject(userCode);
    const userAlgoRunner = new userObjects[UserSolverName]();
    return this.runAlgorithm(userAlgoRunner, runParams);
  }

  private static translateToObject(userCode: string): {
    [UserSolverName]: UserSolver;
  } {
    const classNameRegex = /class (?<className>[a-z]*)/gi;
    let match = classNameRegex.exec(userCode);

    const rewriteAsObjectProperty = (match: RegExpExecArray | null, appendComma = false) => {
      const classname = match?.groups?.className;
      let replacement = `${classname}: class ${classname}`;
      if (appendComma) {
        replacement = `, ${replacement}`;
      }
      if (classname && match) {
        userCode = userCode.replace(match[0], replacement);
      }
    };
    rewriteAsObjectProperty(match);
    while ((match = classNameRegex.exec(userCode)) !== null) {
      rewriteAsObjectProperty(match, true);
    }
    return eval(`Object.assign({}, {${userCode}})`);
  }
}
