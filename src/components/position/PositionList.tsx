import { useStore } from "@nanostores/react";
import { I18n, IsTerminal } from "../../stores/coreStore.ts";
import { RiGridFill, RiTableFill } from "react-icons/ri";
import DataTable from "../common/DataTable.tsx";
import PositionColumns from "../../constants/table-data/positionColumns.ts";
import { Positions } from "../../constants/positions.ts";
import { type KeyboardEvent, useMemo, useState } from "react";
import CardList, { type CardListGroup } from "../common/CardList.tsx";
import type { Position } from "../../types/work.ts";
import { PositionType } from "../../types/work.ts";
import type { DisplayableData } from "../../types/common.ts";
import PositionCard from "./PositionCard.tsx";
import { type AppRoute, ViewRoute } from "../../types/routing.ts";
import PositionDetails from "./PositionDetails.tsx";
import useIsPrerender from "../../hooks/useIsPrerender.ts";
import { KeyListener } from "../common/KeyListener.tsx";
import useKeyHandler from "../../hooks/useKeyHandler.ts";
import { Key } from "../../types/keyboard.ts";
import useTermRouter from "../../hooks/useTermRouter.ts";

export default function PositionList() {
  const $i18n = useStore(I18n);
  const $isTerm = useStore(IsTerminal);

  const [isGridMode, setIsGridMode] = useState(false);
  const isPrerender = useIsPrerender();
  const [selectedPosId, setSelectedPosId] = useState<number | null>(null);
  const refField = "id";

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

  useTermRouter(ViewRoute.Experience, (appRoute: AppRoute) => {
    setSelectedPosId((appRoute.param as number) ?? null);
  });

  useKeyHandler((event: KeyboardEvent) => {
    switch (event.key) {
      case Key.v:
        setIsGridMode(!isGridMode);
    }
  });

  return (
    <>
      {selectedPosId ? (
        <PositionDetails
          positionId={selectedPosId}
          backOnClick={$isTerm ? () => setSelectedPosId(null) : undefined}
        />
      ) : (
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

            <div>{/* TODO: CV link here */}</div>
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
                {!isGridMode && (
                  <DataTable
                    refField={refField}
                    columns={PositionColumns($i18n)}
                    entries={positions}
                    route={ViewRoute.Experience}
                  />
                )}
              </div>
            </div>

            {!isPrerender && (
              <CardList
                className={!isGridMode ? "lg:hidden" : ""}
                isVisible={isGridMode}
                refField={refField}
                group={cardGroup}
                entries={positions}
                card={PositionCard}
                route={ViewRoute.Experience}
              />
            )}
          </div>
          <KeyListener />
        </div>
      )}
    </>
  );
}
