import type { FC } from "react";

export interface ShellContextData {
  i: number;
  input: string;
  submission: string;
  simCmd: string;
  fullscreenCmd?: Command;
  history: CommandEntry[];
}

export interface CommandInfo {
  name: Command;
  output?: FC;
  fullscreen?: boolean;
  arguments?: CommandArgument[];
  options?: string[];
}

export interface CommandArgument {
  name: string;
  options?: string[];
}

export interface CommandEntry {
  timestamp: number;
  cmdName: Command;
  output?: CommandOutput;
  fullscreen?: boolean;
  option?: string;
  argName?: string;
  argValue?: string;
}

export type CommandOutput = FC<{ entry: CommandEntry }>;

export enum Command {
  AboutMe = "about-me",
  Experience = "experience",
  Intro = "intro",
  Help = "help",
  SetLang = "set-lang",
  Clear = "clear",
}
