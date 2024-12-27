import type { I18nCmdDesc } from "../i18nTypes.ts";
import { Command } from "../../types/shell.ts";

export default {
  [Command.AboutMe]: {
    description: "Learn more about me",
  },
  [Command.Experience]: {
    description: "Browse the positions I occupied",
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
