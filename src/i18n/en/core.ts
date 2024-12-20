import type { I18nCore } from "../interfaces.ts";
import { ViewRoute } from "../../constants/routes.ts";

export default {
  siteTitle: "Xavier Saliniere's website",
  sourceCode: "Source Code",
  views: {
    [ViewRoute.Terminal]: "Terminal",
    [ViewRoute.AboutMe]: "About Me",
    [ViewRoute.Experience]: "Experience",
    [ViewRoute.Blog]: "Blog",
  },
} satisfies I18nCore;
