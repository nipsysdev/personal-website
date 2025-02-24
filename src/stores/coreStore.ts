import { atom, computed } from "nanostores";
import { I18nMap } from "../i18n/i18nMap.ts";
import { Lang } from "../constants/lang.ts";
import type { KeyboardEvent } from "react";

export const AstroEnv = atom<Record<string, unknown>>({});
export const IsWeb3 = computed(AstroEnv, (env) => env.MODE === "web3");

export const CurrentLang = atom(Lang.En);
export const I18n = computed(CurrentLang, (lang) => I18nMap[lang]);

export const LastKeyDown = atom<KeyboardEvent | null>(null);
export const OldKeyDown = atom<KeyboardEvent | null>(null);

export const IsTerminal = atom(false);

export const QueryState = atom<Record<string, string>>({});
