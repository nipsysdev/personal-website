import type { I18nCore } from "../interfaces.ts";
import { ViewRoute } from "../../types/viewRoute.ts";

export default {
  siteTitle: "Site web de Xavier Saliniere",
  sourceCode: "Code Source",
  exit: "quitter",
  or: "ou",
  na: "N/A",
  back: "retour",
  backspace: "BACKSPACE",
  escape: "ESC",
  views: {
    [ViewRoute.Terminal]: "Terminal",
    [ViewRoute.AboutMe]: "À propos de moi",
    [ViewRoute.Experience]: "Expérience",
    [ViewRoute.Blog]: "Blog",
  },
} satisfies I18nCore;
