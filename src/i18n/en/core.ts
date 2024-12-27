import type { I18nCore } from "../interfaces.ts";
import { ViewRoute } from "../../types/viewRoute.ts";

export default {
  siteTitle: "Xavier Saliniere's website",
  sourceCode: "Source Code",
  exit: "exit",
  or: "or",
  na: "N/A",
  back: "back",
  backspace: "BACKSPACE",
  escape: "ESC",
  views: {
    [ViewRoute.Terminal]: "Terminal",
    [ViewRoute.AboutMe]: "About Me",
    [ViewRoute.Experience]: "Experience",
    [ViewRoute.Blog]: "Blog",
  },
} satisfies I18nCore;
