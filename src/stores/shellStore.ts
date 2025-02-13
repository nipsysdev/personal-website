import { atom } from "nanostores";
import type { CommandEntry } from "../types/shell.ts";
import type { AppRoute } from "../types/routing.ts";

export const ShellInput = atom("");
export const ShellSubmission = atom("");
export const ShellSimCmd = atom("");

export const ShellHistory = atom<CommandEntry[]>([]);

export const ShellHasIntroduced = atom(false);
export const ShellHasRefreshed = atom(false);

export const LastRouteReq = atom<AppRoute | null>(null);
export const OldRouteReq = atom<AppRoute | null>(null);
