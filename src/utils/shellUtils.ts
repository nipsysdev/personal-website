import {
  Command,
  type CommandEntry,
  type CommandOutput,
} from "../types/shell.ts";
import Commands from "../constants/commands.ts";

function unrecognizedEntry(name: string): CommandEntry {
  return newEntry(name as Command, undefined, undefined, undefined, undefined);
}

function newEntry(
  name: Command,
  output?: CommandOutput,
  fullscreen?: boolean,
  option?: string,
  argName?: string,
  argValue?: string,
): CommandEntry {
  return {
    cmdName: name,
    output,
    fullscreen,
    option,
    argName,
    argValue,
    timestamp: Date.now(),
  };
}

export function ParseEntry(entry: string): CommandEntry {
  const split = entry.split(" ");
  const cmdName =
    Command[
      (Object.entries(Command).find(([, v]) => v === split[0]) ?? [
        "",
      ])[0] as keyof typeof Command
    ];
  const cmdInfo = Commands.find((cmd) => cmd.name === cmdName);

  if (!cmdName || !cmdInfo) return unrecognizedEntry(entry);

  let option = undefined;
  let argName = undefined;
  let argValue = undefined;

  if (split[1]?.includes("--") && split[1]?.includes("=")) {
    const argSplit = split[1].split("=");
    argName = argSplit[0].replace("--", "");
    argValue = argSplit[1];
  } else {
    option = split[1];
  }

  return newEntry(
    cmdName,
    cmdInfo.output,
    cmdInfo.fullscreen,
    option,
    argName,
    argValue,
  );
}

export function GetEntryInput(entry: CommandEntry) {
  let pastInput = entry.cmdName as string;
  if (entry.option) {
    pastInput += ` ${entry.option}`;
  }
  if (entry.argName) {
    pastInput += ` --${entry.argName}=${entry.argValue}`;
  }
  return pastInput;
}
