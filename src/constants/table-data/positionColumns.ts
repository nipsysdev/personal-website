import type { DataTableColumn } from "../../components/common/DataTable.tsx";
import type { I18nContent } from "../../i18n/i18nTypes.ts";
import type { Position } from "../../types/work.ts";
import {
  FormatDevTools,
  FormatWorkPeriod,
} from "../../utils/position-formatting.ts";

export default function PositionColumns(i18n: I18nContent): DataTableColumn[] {
  return [
    {
      field: "id",
      width: "5%",
      header: "#",
      sortable: true,
    },
    {
      field: "company",
      width: "20%",
      header: i18n.experience.company,
      sortable: true,
    },
    {
      field: "role",
      width: "13%",
      header: i18n.experience.role,
      format: (row: unknown) => i18n.enums.positionRole[(row as Position).role],
      sortable: true,
    },
    {
      field: "type",
      width: "13%",
      header: i18n.experience.contractType,
      format: (row: unknown) => i18n.enums.positionType[(row as Position).type],
      sortable: true,
    },
    {
      field: "devTools",
      width: "auto",
      header: i18n.experience.developmentEnvironment,
      format: (row: unknown) => FormatDevTools(row as Position),
      sortable: false,
    },
    {
      field: "period",
      width: "18%",
      header: i18n.experience.period,
      format: (row: unknown) => FormatWorkPeriod(row as Position, i18n),
      sortable: true,
    },
  ];
}
