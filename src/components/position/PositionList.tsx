import { useStore } from "@nanostores/react";
import { CurrentLang, I18n } from "../../stores/coreStore.ts";
import { RiGridFill, RiTableFill } from "react-icons/ri";
import DataTable from "../common/DataTable.tsx";
import PositionColumns from "../../constants/table-data/positionColumns.ts";
import { Positions } from "../../constants/positions.ts";
import { useEffect, useMemo, useState } from "react";
import CardList, { type CardListGroup } from "../common/CardList.tsx";
import type { Position } from "../../types/work.ts";
import { PositionType } from "../../types/work.ts";
import type { DisplayableData } from "../../types/common.ts";
import PositionCard from "./PositionCard.tsx";
import { ViewRoute } from "../../types/viewRoute.ts";
import PositionDetails from "./PositionDetails.tsx";
import { RouteUtils } from "../../utils/routeUtils.ts";

interface Props {
  isTerminal?: boolean;
}

export default function PositionList(props: Props) {
  const $lang = useStore(CurrentLang);
  const $i18n = useStore(I18n);
  const [isGridMode, setIsGridMode] = useState(false);
  const [isPrerender, setIsPrerender] = useState(true);
  const [selectedPosId, setSelectedPosId] = useState<number | null>(null);
  const refField = "id";

  useEffect(() => {
    setIsPrerender(false);
  }, []);

  const positions = useMemo(() => {
    return Positions.sort((a, b) => (a.id < b.id ? 1 : -1));
  }, [Positions]);

  const cardGroup = useMemo<CardListGroup>(
    () => ({
      field: "type",
      name: (val: string) => $i18n.enums.positionType[val as PositionType],
      groupEntries: (entries: Record<string, DisplayableData>[]) => {
        const positions = entries as Position[];
        const grouped: Record<PositionType, Position[]> = {
          [PositionType.FullTime]: [],
          [PositionType.PartTime]: [],
          [PositionType.WorkStudy]: [],
          [PositionType.Internship]: [],
        };
        positions.forEach((position) => grouped[position.type].push(position));
        return grouped;
      },
    }),
    [$i18n],
  );

  // TODO: Implement key event receiver. Use it for Datatable & Details. Pass to parent so TerminalEmulator can catch ESC.

  return (
    <>
      {!selectedPosId && (
        <div className="flex flex-col h-full">
          {/* TODO: Extract a page title component */}
          <div className="flex items-end gap-x-5 w-full">
            <div className="flex basis-11/12 items-center border-y-2 border-darkslategray text-sm">
              <div className="text-lg font-bold bg-steelblue/60 px-5 py-1">
                {$i18n.experience.myExperience}
              </div>
              <div className="flex-auto pl-7">
                {$i18n.experience.selectPosition}
              </div>
              <div className="pr-7">
                <div className="flex items-center text-right">
                  {$i18n.experience.viewMode}:
                  <div className="px-2 cursor-pointer">
                    <RiTableFill
                      className={`opacity-30 lg:opacity-100 ${!isGridMode ? "lg:text-steelblue" : ""}`}
                      size={20}
                      onClick={() => setIsGridMode(false)}
                    />
                  </div>
                  /
                  <div className="px-2 cursor-pointer">
                    <RiGridFill
                      className={`text-steelblue lg:text-darkgray ${isGridMode ? "lg:text-steelblue" : ""}`}
                      size={20}
                      onClick={() => setIsGridMode(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-auto overflow-hidden">
            <div
              className={`flex-col size-full ${
                isPrerender
                  ? ""
                  : `hidden ${isGridMode ? "lg:hidden" : "lg:flex"}`
              }`}
            >
              <div className="border-b border-darkslategray">
                <div className="bg-darkslategray px-2 py-1 w-fit text-sm">
                  {$i18n.experience.positions}
                </div>
              </div>

              <div className="flex-auto">
                <DataTable
                  refField={refField}
                  columns={PositionColumns($i18n)}
                  entries={positions}
                  anchorPath={
                    props.isTerminal
                      ? undefined
                      : RouteUtils.getPathForLang(ViewRoute.Experience, $lang)
                  }
                  btnClick={
                    props.isTerminal
                      ? (entry: Record<string, DisplayableData>) =>
                          setSelectedPosId((entry as Position).id)
                      : undefined
                  }
                />
              </div>
            </div>

            {!isPrerender && (
              <CardList
                className={!isGridMode ? "lg:hidden" : ""}
                refField={refField}
                group={cardGroup}
                entries={positions}
                card={PositionCard}
              />
            )}
          </div>
        </div>
      )}

      {selectedPosId && (
        <PositionDetails
          positionId={selectedPosId}
          backOnClick={
            props.isTerminal ? () => setSelectedPosId(null) : undefined
          }
        />
      )}
    </>
  );
}
