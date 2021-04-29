import _ from "lodash";
import { AlgorithmRunner, AlghorithmRunParams } from "../algo/runner";
import {
  AlgorithmCommand,
  ConsoleCommand,
  RunAlgortimCommand,
  RunAlgortimCommandParamOrder,
} from "./consoleCommands";

export class ConsoleLogic {
  static parseCommand(command: string): ConsoleCommand | undefined {
    const [commandName, commandArgsString] = command
      .replace(/ /g, "")
      .replace(/[()]/g, " ")
      .split(" ");
    const commandArgs = commandArgsString.split(",");

    switch (commandName) {
      case AlgorithmCommand.RunAlgorithm:
        return this.parseRunAlgorithmCommand(commandArgs);
      default:
        return undefined;
    }
  }

  private static parseRunAlgorithmCommand(tokens: string[]): RunAlgortimCommand {
    const hyperParams: Omit<AlghorithmRunParams, "kernel"> = {} as Omit<
      AlghorithmRunParams,
      "kernel"
    >;
    RunAlgortimCommandParamOrder.forEach((paramName, idx) => {
      hyperParams[paramName] = parseInt(tokens[idx], 10);
    });
    return {
      code: AlgorithmCommand.RunAlgorithm,
      runParams: hyperParams,
    };
  }
}
