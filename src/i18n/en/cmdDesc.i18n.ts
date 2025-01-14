import type { I18nCmdDesc } from "../i18nTypes.ts";
import { Command } from "../../types/shell.ts";

export default {
  [Command.Whoami]: {
    description: "Print a brief overview of whoami",
  },
  [Command.Experience]: {
    description: "Browse the positions I occupied",
  },
  [Command.Blog]: {
    description: "Browse my blog entries",
  },
  [Command.Contact]: {
    description: "Print contact info",
  },
  [Command.SetLang]: {
    description: "Change language",
  },
  [Command.Intro]: {
    description: "Print intro message",
  },
  [Command.Help]: {
    description: "Print list of commands",
  },
  [Command.Clear]: {
    description: "Clear the terminal screen",
  },
} satisfies I18nCmdDesc;
