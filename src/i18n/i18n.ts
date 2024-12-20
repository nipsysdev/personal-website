import type { I18nContent } from "./interfaces.ts";
import EnCore from "./en/core.ts";
import FrCore from "./fr/core.ts";

export enum Lang {
  En = "en",
  Fr = "fr",
}

export const LangLabels: Record<Lang, string> = {
  [Lang.En]: "English",
  [Lang.Fr]: "Français",
};

export const Content: Record<Lang, I18nContent> = {
  [Lang.En]: {
    core: EnCore,
  },
  [Lang.Fr]: {
    core: FrCore,
  },
};
