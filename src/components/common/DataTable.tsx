import type { KeyboardEvent } from "react";
import { useState } from "react";
import type { DisplayableData } from "../../types/common.ts";
import useKeyHandler from "../../hooks/useKeyHandler.ts";
import { Key } from "../../types/keyboard.ts";
import AppLink from "./AppLink.tsx";
import { ViewRoute } from "../../types/routing.ts";

export interface DataTableColumn {
  field: string;
  width: string;
  header: string;
  format?: (row: Record<string, DisplayableData>) => string;
  sortable?: boolean;
}

interface Props {
  className?: string;
  refField: string;
  columns: DataTableColumn[];
  entries: Record<string, DisplayableData>[];
  route: ViewRoute;
}

export default function DataTable(props: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useKeyHandler((event: KeyboardEvent) => {
    switch (event.key) {
      case Key.ArrowUp:
        setSelectedIndex(
          selectedIndex <= 0 ? props.entries.length - 1 : selectedIndex - 1,
        );
        break;
      case Key.ArrowDown:
        setSelectedIndex(
          selectedIndex >= props.entries.length - 1 ? 0 : selectedIndex + 1,
        );
        break;
    }
  });

  return (
    <>
      <div
        className={`data-table size-full overflow-y-auto ${props.className ?? ""}`}
      >
        <div className="flex flex-col h-full">
          <div className="table table-fixed w-full flex-shrink-0">
            <div className="table-header-group sticky top-0 z-10 bg-darkerslategray">
              <div className="table-row">
                {props.columns.map((col) => (
                  <div
                    key={col.field}
                    className="table-cell border border-darkslategray px-1 py-1"
                    style={{ width: col.width }}
                  >
                    <div className="text-sm bg-darkslategray px-1">
                      {col.header}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="table-row-group">
              {props.entries.map((entry, i) => (
                <AppLink
                  key={`${entry[props.refField]}`}
                  param={entry[props.refField] as number | string}
                  route={props.route}
                  listen={{
                    key: Key.Enter,
                    deactivated: selectedIndex !== i,
                  }}
                  className={`table-row text-olivedrab even:text-lightseagreen ${selectedIndex === i ? "selected" : ""}`}
                  onMouseEnter={() => setSelectedIndex(i)}
                >
                  {props.columns.map((col) => (
                    <div
                      key={col.field}
                      className="table-cell border-x border-darkslategray px-2 py-0.5"
                      style={{ width: col.width }}
                    >
                      {col.format
                        ? col.format(entry)
                        : (entry[col.field] as string)}
                    </div>
                  ))}
                </AppLink>
              ))}
            </div>
          </div>

          {/* Fake table to simulate first one going all the way down */}
          <div className="table table-fixed flex-auto">
            <div className="table-row-group">
              <div className="table-row">
                {props.columns.map((col) => (
                  <div
                    key={col.field}
                    className="table-cell border border-t-0 border-darkslategray"
                    style={{ width: col.width }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style lang="scss" scoped>
        {`
          .data-table {
            .table-cell {
              position: relative;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
          
              &:not(:first-child) {
                border-left: none;
              }
            }
          
            .table-row-group {
              .table-row {
                &.selected .table-cell::before {
                  position: absolute;
                  content: '';
                  z-index: 0;
                  top: 5px;
                  right: 5px;
                  left: 5px;
                  bottom: 5px;
                  background-color: rgba(55, 143, 210, 0.5);
                }
              }
            }
          }
        `}
      </style>
    </>
  );
}
