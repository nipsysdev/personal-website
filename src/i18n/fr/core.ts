import type { I18nCore } from "../interfaces.ts";
import { ViewRoute } from "../../constants/routes.ts";

export default {
  siteTitle: "Site web de Xavier Saliniere",
  sourceCode: "Code Source",
  views: {
    [ViewRoute.Terminal]: "Terminal",
    [ViewRoute.AboutMe]: "À propos de moi",
    [ViewRoute.Experience]: "Expérience",
    [ViewRoute.Blog]: "Blog",
  },
} satisfies I18nCore;
