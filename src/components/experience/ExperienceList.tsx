import { useStore } from "@nanostores/react";
import { I18n } from "../../stores/coreStore.ts";
import { RiGridFill, RiTableFill } from "react-icons/ri";

export default function ExperienceList() {
  const $i18n = useStore(I18n);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between mb-3 text-sm opacity-90">
        <div>{$i18n.experience.selectPosition}</div>

        <div className="flex items-center text-right">
          {$i18n.experience.viewMode}
          <div className="px-3 cursor-pointer">
            <RiTableFill className="opacity-30 lg:opacity-100" size={20} />
          </div>
          /
          <div className="px-3 cursor-pointer">
            <RiGridFill className="text-steelblue lg:text-darkgray" size={20} />
          </div>
        </div>
      </div>

      <div className="flex-auto overflow-hidden"></div>
    </div>
  );
}
