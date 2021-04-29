import _ from "lodash";
import { Runner, RunParams } from "../../logic/algo/runner";
import {
  AlgorithmCommand,
  ConsoleCommand,
  RunAlgortimCommand,
  RunAlgortimCommandParamOrder,
} from "./consoleCommands";

export class ConsoleLogic {
  static execute(command: string): void {
    const commandObj = this.parseCommand(command);
    if (_.isNil(commandObj)) {
      return;
    }
    this.executeCommand(commandObj);
  }

  private static parseCommand(command: string) {
    const [commandName, commandArgsString] = command
      .replace(" ", "")
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
    const hyperParams: Omit<RunParams, "kernel"> = {} as Omit<RunParams, "kernel">;
    RunAlgortimCommandParamOrder.forEach((paramName, idx) => {
      hyperParams[paramName] = parseInt(tokens[idx], 10);
    });
    return {
      code: AlgorithmCommand.RunAlgorithm,
      runParams: hyperParams,
    };
  }

  private static executeCommand(command: ConsoleCommand) {
    switch (command.code) {
      case AlgorithmCommand.RunAlgorithm:
        Runner.run(command.runParams);
        break;
      default:
        break;
    }
  }
}
