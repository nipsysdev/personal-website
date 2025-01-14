import { Command, type CommandInfo } from "../types/shell.ts";
import IntroOutput from "../components/outputs/IntroOutput.tsx";
import HelpOutput from "../components/outputs/HelpOutput.tsx";
import SetLangOutput from "../components/outputs/SetLangOutput.tsx";
import { Lang } from "./lang.ts";
import ExperienceOutput from "../components/outputs/ExperienceOutput.tsx";

function enumToArg(o: { [s: string]: string } | ArrayLike<string>): string[] {
  return Object.values(o).map((l: string) => {
    return l.replace(" ", "").replace("-", "").toLowerCase();
  });
}

export default [
  {
    name: Command.Whoami,
  },
  {
    name: Command.Experience,
    fullscreen: true,
    output: ExperienceOutput,
  },
  {
    name: Command.Blog,
  },
  {
    name: Command.Contact,
  },
  {
    name: Command.SetLang,
    options: enumToArg(Lang),
    output: SetLangOutput,
  },
  {
    name: Command.Intro,
    output: IntroOutput,
  },
  {
    name: Command.Help,
    output: HelpOutput,
  },
  {
    name: Command.Clear,
  },
] as CommandInfo[];
