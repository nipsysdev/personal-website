import type { KeyboardEvent } from "react";
import { type JSX, useMemo, useState } from "react";
import type { DisplayableData } from "../../types/common.ts";
import useKeyHandler from "../../hooks/useKeyHandler.ts";
import { Key } from "../../types/keyboard.ts";
import { ViewRoute } from "../../types/routing.ts";
import AppLink from "./AppLink.tsx";

export interface CardListGroup {
  field: string;
  name: (val: string) => string;
  groupEntries: (
    entries: Record<string, DisplayableData>[],
  ) => Record<string, Record<string, DisplayableData>[]>;
}

export interface CardProps {
  children: Record<string, DisplayableData>;
  entry: Record<string, DisplayableData>;
  refField: string;
  isSelected: boolean;
}

interface Props {
  className?: string;
  refField: string;
  isVisible: boolean;
  group: CardListGroup;
  entries: Record<string, DisplayableData>[];
  card: (props: CardProps) => JSX.Element;
  route: ViewRoute;
}

export default function CardList(props: Props) {
  const groupedEntries = useMemo(() => {
    return props.group.groupEntries(props.entries);
  }, [props.group, props.entries]);
  const groupKeys = useMemo(() => {
    return Object.keys(groupedEntries);
  }, [groupedEntries]);
  const [selectionPos, setSelectionPos] = useState([0, 0]);

  useKeyHandler((event: KeyboardEvent) => {
    switch (event.key) {
      case Key.ArrowUp:
        setSelectionPos([Math.max(selectionPos[0] - 1, 0), 0]);
        break;
      case Key.ArrowDown:
        setSelectionPos([
          Math.min(selectionPos[0] + 1, groupKeys.length - 1),
          0,
        ]);
        break;
      case Key.ArrowLeft:
        setSelectionPos([selectionPos[0], Math.max(selectionPos[1] - 1, 0)]);
        break;
      case Key.ArrowRight:
        setSelectionPos([
          selectionPos[0],
          Math.min(
            selectionPos[1] + 1,
            groupedEntries[groupKeys[selectionPos[0]]].length - 1,
          ),
        ]);
        break;
    }
  });

  return (
    <div className="size-full">
      <div
        className={`overflow-y-auto h-full flex flex-col gap-y-5 ${props.className}`}
      >
        {groupKeys.map((key, groupIdx) => (
          <div key={key}>
            <div
              className={`text-sm mb-3 ${!groupIdx ? "border-b" : "border-y"} border-darkslategray`}
            >
              <h3 className="text-sm lowercase bg-darkslategray px-2 py-1 w-fit">
                {props.group.name(key)}
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mr-1">
              {groupedEntries[key].map((entry, entryIdx) => {
                const isSelected =
                  groupIdx === selectionPos[0] && entryIdx === selectionPos[1];
                return (
                  <AppLink
                    key={`${entry[props.refField]}`}
                    route={props.route}
                    param={entry[props.refField] as number | string}
                    listen={{
                      key: Key.Enter,
                      deactivated: !props.isVisible || !isSelected,
                    }}
                    className={`border ${isSelected ? "border-steelblue" : "border-darkslategray"} overflow-hidden text-sm`}
                    onMouseEnter={() => setSelectionPos([groupIdx, entryIdx])}
                  >
                    <props.card
                      entry={entry}
                      refField={props.refField}
                      isSelected={isSelected}
                    >
                      {entry}
                    </props.card>
                  </AppLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
