import type { ComponentType } from "react";
import type { I18nContent } from "../i18n/i18nTypes.ts";

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
  output?: CommandOutput;
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

export type CommandOutput = ComponentType<CommandOutputProps>;

export interface CommandOutputProps {
  entry: CommandEntry;
  i18nContent: I18nContent;
}

export enum Command {
  AboutMe = "about-me",
  Experience = "experience",
  Intro = "intro",
  Help = "help",
  SetLang = "set-lang",
  Clear = "clear",
}
