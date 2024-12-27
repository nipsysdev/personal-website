import { atom, computed } from "nanostores";
import { I18nMap } from "../i18n/i18nMap.ts";
import { Lang } from "../constants/lang.ts";

export const CurrentLang = atom(Lang.En);
export const I18n = computed(CurrentLang, (lang) => I18nMap[lang]);
