import { Opaque } from "../../utlis";
import { MonteCarloTreeSearch, Solver, SolverFunction, StepToImplementName } from "../algo/solver";
import { StringifiedFunction } from "./stringifiedFunction";

type FunctionDescription = Opaque<"Description", string>;
const functionsToImplement: Record<StepToImplementName, FunctionDescription> = {
  choose: "Selects child for which algorithm will make rolout in current step" as FunctionDescription,
  expand: "Expands selected path" as FunctionDescription,
  select: "Selects next node" as FunctionDescription,
  run: "Executes all steps needed to complete an aglo" as FunctionDescription,
};

const UserDefinedClassName = "AlgorithmRunner";
const CONSTRUCTOR_FUNC_NAME = "constructor";
export class AlgorithmCodePreprocessor {
  static getAlgorithmCode(): string {
    const codeWithReplacedImplementations = this.replaceImplementations();
    return codeWithReplacedImplementations;
  }

  static replaceImplementations(): string {
    const classBody = Object.getOwnPropertyNames(MonteCarloTreeSearch.prototype)
      .filter((funcName) => funcName !== CONSTRUCTOR_FUNC_NAME)
      .map((propertyName) => {
        const originalFunction = this.functionImplementation(propertyName as keyof Solver);
        const mappedFunction =
          propertyName in functionsToImplement
            ? this.createFunctionWithTodo(propertyName as keyof Solver, originalFunction)
            : new StringifiedFunction(originalFunction.toString());
        return mappedFunction.format().toString();
      });

    return `class ${UserDefinedClassName} {
${classBody.join("\n\n")}
}`;
  }

  private static functionImplementation(porperty: keyof Solver): SolverFunction {
    return MonteCarloTreeSearch.prototype[porperty];
  }

  private static createFunctionWithTodo(
    functionName: StepToImplementName,
    originalFunction: SolverFunction
  ): StringifiedFunction {
    const comment = functionsToImplement[functionName];
    const signature = this.extractSignature(originalFunction);
    return new StringifiedFunction(`${functionName} (${signature}) {
      /**
       * ${comment}
      */
    }`);
  }

  private static extractSignature(func: SolverFunction): string {
    const funcString = func.toString();
    const startBraketIndx = funcString.indexOf("(");
    const endBraketIndx = funcString.indexOf(")");
    return funcString.substr(startBraketIndx + 1, endBraketIndx - startBraketIndx - 1);
  }
}
