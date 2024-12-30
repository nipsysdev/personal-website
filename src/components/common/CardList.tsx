import type { DisplayableData } from "../../types/common.ts";
import { type JSX, useMemo, useState } from "react";

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
  selected: boolean;
  onMouseEnter: () => void;
}

interface Props {
  className?: string;
  refField: string;
  group: CardListGroup;
  entries: Record<string, DisplayableData>[];
  card: (props: CardProps) => JSX.Element;
}

export default function CardList(props: Props) {
  const groupedEntries = useMemo(() => {
    return props.group.groupEntries(props.entries);
  }, [props.group, props.entries]);
  const groupKeys = useMemo(() => {
    return Object.keys(groupedEntries);
  }, [groupedEntries]);
  const [selectionPos, setSelectionPos] = useState([0, 0]);

  return (
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
            {groupedEntries[key].map((entry, entryIdx) => (
              <props.card
                key={entry[props.refField] as string}
                entry={entry}
                selected={
                  groupIdx === selectionPos[0] && entryIdx === selectionPos[1]
                }
                onMouseEnter={() => setSelectionPos([groupIdx, entryIdx])}
              >
                {entry}
              </props.card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
