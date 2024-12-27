import type { I18nCmdDesc } from "../i18nTypes.ts";
import { Command } from "../../types/shell.ts";

export default {
  [Command.AboutMe]: {
    description: "En savoir plus sur moi",
  },
  [Command.Experience]: {
    description: "Parcourir les postes que j'ai occupés",
  },
  [Command.SetLang]: {
    description: "Changer de langue",
  },
  [Command.Intro]: {
    description: "Afficher le message d'introduction",
  },
  [Command.Help]: {
    description: "Afficher la liste des commandes",
  },
  [Command.Clear]: {
    description: "Effacer l'écran du terminal",
  },
} satisfies I18nCmdDesc;
