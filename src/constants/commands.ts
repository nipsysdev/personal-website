import { Command, type CommandInfo } from "../types/shell.ts";
import IntroOutput from "../components/cmd-outputs/IntroOutput.tsx";
import HelpOutput from "../components/cmd-outputs/HelpOutput.tsx";
import SetLangOutput from "../components/cmd-outputs/SetLangOutput.tsx";
import { Lang } from "./lang.ts";
import { ExperienceOutput } from "../components/position/PositionList.tsx";
import { BlogOutput } from "../components/blog/BlogEntries.tsx";
import { WhoamiOutput } from "../components/about-me/AboutMe.tsx";
import { ContactOutput } from "../components/contact/ContactInfo.tsx";

function enumToArg(o: { [s: string]: string } | ArrayLike<string>): string[] {
  return Object.values(o).map((l: string) => {
    return l.replace(" ", "").replace("-", "").toLowerCase();
  });
}

// TODO: Add a command to display IPFS hash (retrieve from ENS domain)
export default [
  {
    name: Command.Whoami,
    output: WhoamiOutput,
  },
  {
    name: Command.Experience,
    fullscreen: true,
    output: ExperienceOutput,
  },
  {
    name: Command.Blog,
    output: BlogOutput,
  },
  {
    name: Command.Contact,
    output: ContactOutput,
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
