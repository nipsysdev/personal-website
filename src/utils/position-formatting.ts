import type { Position } from "../types/work.ts";
import type { I18nContent } from "../i18n/i18nTypes.ts";
import dayjs from "dayjs";
import DevToolWeight from "../constants/devToolWeight.ts";

function capitalize(str: string) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

export function FormatWorkPeriod(
  position: Position,
  i18n: I18nContent,
): string {
  const from = dayjs(position.period[0]).format("MMM YYYY");
  let to = i18n.experience.present;

  if (position.period[1]) {
    to = dayjs(position.period[1]).format("MMM YYYY");
  }

  return `${capitalize(from)} - ${capitalize(to)}`;
}

export function FormatDevTools(position: Position): string {
  return [
    position.mainDevTool,
    ...[...position.feDevTools, ...position.beDevTools]
      .filter((stack) => stack !== position.mainDevTool)
      .sort((a, b) => DevToolWeight[b] - DevToolWeight[a]),
  ].join("/");
}
