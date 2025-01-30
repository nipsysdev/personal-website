import type { KeyboardEvent } from "react";
import {
  type DetailedHTMLProps,
  type HTMLAttributes,
  type JSX,
  useState,
} from "react";
import type { DisplayableData } from "../../types/common.ts";
import useKeyHandler from "../../hooks/useKeyHandler.ts";
import { KeyListener } from "./KeyListener.tsx";

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
  anchorPath?: string;
  btnClick?: (entry: Record<string, DisplayableData>) => void;
}

export default function DataTable(props: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useKeyHandler((event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        setSelectedIndex(
          selectedIndex <= 0 ? props.entries.length - 1 : selectedIndex - 1,
        );
        break;
      case "ArrowDown":
        setSelectedIndex(
          selectedIndex >= props.entries.length - 1 ? 0 : selectedIndex + 1,
        );
        break;
      case "Enter":
        if (props.btnClick) {
          props.btnClick(props.entries[selectedIndex]);
        } else {
          window.location.replace(
            `${props.anchorPath}/${props.entries[selectedIndex][props.refField]}`,
          );
        }
        break;
    }
  });

  const rowEl = (
    entry: Record<string, DisplayableData>,
    i: number,
    children: JSX.Element[],
  ) => {
    const key = `${entry[props.refField]}`;
    let attr = {
      role: undefined as string | undefined,
      tabIndex: undefined as number | undefined,
      onClick: undefined as (() => void) | undefined,
      className: `table-row text-olivedrab cursor-pointer even:text-lightseagreen ${selectedIndex === i ? "selected" : ""}`,
      onMouseEnter: () => setSelectedIndex(i),
    } satisfies DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

    if (props.anchorPath) {
      return (
        <a
          key={key}
          {...attr}
          href={`${props.anchorPath}${entry[props.refField]}/`}
        >
          {children}
        </a>
      );
    }

    if (props.btnClick) {
      const btnClick = props.btnClick;
      attr = {
        ...attr,
        role: "button",
        tabIndex: 1,
        onClick: () => btnClick(entry),
      };
    } else {
      attr.className = attr.className.replace(
        "cursor-pointer",
        "cursor-default",
      );
    }

    return (
      <div key={key} {...attr}>
        {children}
      </div>
    );
  };

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
              {props.entries.map((entry, i) =>
                rowEl(
                  entry,
                  i,
                  props.columns.map((col) => (
                    <div
                      key={col.field}
                      className="table-cell border-x border-darkslategray px-2 py-0.5"
                      style={{ width: col.width }}
                    >
                      {col.format
                        ? col.format(entry)
                        : (entry[col.field] as string)}
                    </div>
                  )),
                ),
              )}
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
      <KeyListener />

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
