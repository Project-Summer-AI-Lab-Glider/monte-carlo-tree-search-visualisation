import { Opaque } from "../../utlis";
import { StepToImplementName } from "../algo/solver";
import { StringifyAlghorytm, TODO } from "./stringifiedAlgorithm";

type FunctionDescription = Opaque<"Description", string>;
export const UserDefinedClassName = "AlgorithmRunner";
const functionDescriptions: Record<StepToImplementName, FunctionDescription> = {
  choose: "Selects child for which algorithm will make rolout in current step" as FunctionDescription,
  expand: "Expands selected path" as FunctionDescription,
  select: "Selects next node" as FunctionDescription,
  run: "Executes all steps needed to complete an aglo" as FunctionDescription,
};

export class AlgorithmCodePreprocessor {
  static getAlgorithmCode(): string {
    const todos = {} as Record<StepToImplementName, TODO>;
    Object.keys(functionDescriptions).forEach((funcName) => {
      const description = functionDescriptions[funcName as StepToImplementName];
      todos[funcName as StepToImplementName] = this.createTODO(description);
    });
    return StringifyAlghorytm(todos);
  }

  static createTODO(description: string): TODO {
    return `/** TODO 
        * ${description} 
        */` as TODO;
  }
}
