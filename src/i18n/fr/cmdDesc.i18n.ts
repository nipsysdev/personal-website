import type { I18nCmdDesc } from "../i18nTypes.ts";
import { Command } from "../../types/shell.ts";

export default {
  [Command.Whoami]: {
    description: "En savoir plus sur moi",
  },
  [Command.Experience]: {
    description: "Parcourir les postes que j'ai occupés",
  },
  [Command.Blog]: {
    description: "Parcourir mes billets de blog",
  },
  [Command.Contact]: {
    description: "Afficher les informations de contact",
  },
  [Command.SetLang]: {
    description: "Changer la langue",
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
