import type { CardProps } from "../common/CardList.tsx";
import { useStore } from "@nanostores/react";
import { I18n } from "../../stores/coreStore.ts";
import { type KeyboardEvent, useEffect, useMemo, useRef } from "react";
import type { Position } from "../../types/work.ts";
import {
  FormatDevTools,
  FormatWorkPeriod,
} from "../../utils/position-formatting.ts";
import useKeyHandler from "../../hooks/useKeyHandler.ts";

export default function PositionCard(props: CardProps) {
  const $i18n = useStore(I18n);
  const entry = useMemo(() => props.entry as Position, [props.entry]);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (props.selected && !cardRef.current?.matches(":hover")) {
      cardRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [props.selected]);

  useKeyHandler((event: KeyboardEvent) => {
    if (!props.selected) return;
    switch (event.key) {
      case "Enter":
        if (props.btnClick) {
          props.btnClick(props.entry);
        } else if (props.anchorPath) {
          window.location.replace(
            `${props.anchorPath}${props.entry[props.refField]}/`,
          );
        }
        break;
    }
  });

  return (
    <div
      className={`border ${props.selected ? "border-steelblue" : "border-darkslategray"} overflow-hidden text-sm cursor-pointer`}
      onMouseEnter={props.onMouseEnter}
      ref={cardRef}
    >
      <div
        className={`flex bg-darkslategray px-2 pt-1 ${props.selected ? "bg-steelblue" : "text-steelblue"}`}
      >
        <div className="flex-auto">
          <span className="text-xs">{$i18n.experience.company}</span>
          <div className="font-bold text-darkgray">{entry.company}</div>
        </div>
        <div className="flex-auto text-right">
          <span className="text-xs">{$i18n.experience.role}</span>
          <div className="text-darkgray">{entry.role}</div>
        </div>
      </div>

      <div className="px-2 pb-1">
        <div>
          <span className="text-xs text-steelblue">
            {$i18n.experience.developmentEnvironment}
          </span>
          <div className="overflow-hidden text-ellipsis text-nowrap text-darkgray">
            {FormatDevTools(entry)
              .split("/")
              .map((e, i) => (
                <span
                  key={e}
                  className={`${i === 0 ? "text-olivedrab font-bold" : "text-darkgray"}`}
                >
                  {i > 0 && <>/</>}
                  {e}
                </span>
              ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-x-2">
          <div className="flex-auto text-nowrap">
            <span className="text-xs text-steelblue">
              {$i18n.experience.contractType}
            </span>
            <div>{$i18n.enums.positionType[entry.type]}</div>
          </div>
          <div className="flex-auto text-nowrap">
            <span className="text-xs text-steelblue">
              {$i18n.experience.period}
            </span>
            <div>{FormatWorkPeriod(entry, $i18n)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
