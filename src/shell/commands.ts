import { Lang } from "../i18n/i18nMap.ts";
import { Command, type CommandInfo } from "../types/shell.ts";
import IntroOutput from "../components/cmd-outputs/IntroOutput.tsx";
import HelpOutput from "../components/cmd-outputs/HelpOutput.tsx";

function enumToArg(o: { [s: string]: string } | ArrayLike<string>): string[] {
  return Object.values(o).map((l: string) => {
    return l.replace(" ", "").replace("-", "").toLowerCase();
  });
}

export default [
  {
    name: Command.AboutMe,
  },
  {
    name: Command.Experience,
    fullscreen: true,
  },
  {
    name: Command.SetLang,
    options: enumToArg(Lang),
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
