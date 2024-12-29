import { useStore } from "@nanostores/react";
import { I18n } from "../../stores/coreStore.ts";
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

export default function ExperienceList() {
  const $i18n = useStore(I18n);
  const [isGridMode, setIsGridMode] = useState(false);
  const refField = "id";
  const [isPrerender, setIsPrerender] = useState(true);

  useEffect(() => {
    setIsPrerender(false);
  }, []);

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
        positions
          .sort((a, b) => (a.id < b.id ? 1 : -1))
          .forEach((position) => grouped[position.type].push(position));
        return grouped;
      },
    }),
    [$i18n],
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between mb-3 text-sm opacity-90">
        <div>{$i18n.experience.selectPosition}</div>

        <div className="flex items-center text-right">
          {$i18n.experience.viewMode}
          <div className="px-3 cursor-pointer">
            <RiTableFill
              className={`opacity-30 lg:opacity-100 ${!isGridMode ? "lg:text-steelblue" : ""}`}
              size={20}
              onClick={() => setIsGridMode(false)}
            />
          </div>
          /
          <div className="px-3 cursor-pointer">
            <RiGridFill
              className={`text-steelblue lg:text-darkgray ${isGridMode ? "lg:text-steelblue" : ""}`}
              size={20}
              onClick={() => setIsGridMode(true)}
            />
          </div>
        </div>
      </div>

      <div className="flex-auto overflow-hidden">
        <DataTable
          className={
            isPrerender ? "" : `hidden ${isGridMode ? "lg:hidden" : "lg:block"}`
          }
          refField={refField}
          columns={PositionColumns($i18n)}
          entries={Positions}
        />

        {!isPrerender && (
          <CardList
            className={!isGridMode ? "lg:hidden" : ""}
            refField={refField}
            group={cardGroup}
            entries={Positions}
            card={PositionCard}
          />
        )}
      </div>
    </div>
  );
}
