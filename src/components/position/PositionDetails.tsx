import { CurrentLang, I18n } from "../../stores/coreStore.ts";
import { useStore } from "@nanostores/react";
import { useMemo } from "react";
import { Positions } from "../../constants/positions.ts";
import { FormatWorkPeriod } from "../../utils/position-formatting.ts";
import { Companies } from "../../constants/companies.ts";
import { PositionRole } from "../../types/work.ts";
import { ViewRoute } from "../../types/viewRoute.ts";
import { RouteUtils } from "../../utils/routeUtils.ts";
import useKeyHandler from "../../hooks/useKeyHandler.ts";
import { KeyListener } from "../common/KeyListener.tsx";

interface Props {
  positionId: number;
  backOnClick?: () => void;
}

export default function PositionDetails(props: Props) {
  const $lang = useStore(CurrentLang);
  const $i18n = useStore(I18n);

  const position = useMemo(
    () => Positions.find((pos) => pos.id === props.positionId),
    [props.positionId],
  );
  const positionInfo = useMemo(
    () => (position ? $i18n.positionsDetails[position.id] : null),
    [$i18n, position],
  );
  const company = useMemo(
    () => (position ? Companies[position.company] : null),
    [],
  );

  useKeyHandler((event) => {
    if (event.key === "Backspace") {
      if (props.backOnClick) {
        props.backOnClick();
      } else {
        window.location.replace(
          RouteUtils.getPathForLang(ViewRoute.Experience, $lang),
        );
      }
    }
  });

  const backEl = () => {
    const classNames = "font-bold text-darkgoldenrod cursor-pointer text-base";
    const content = `[${$i18n.core.back}]`;

    if (props.backOnClick) {
      return (
        <button className={classNames} onClick={props.backOnClick}>
          {content}
        </button>
      );
    }

    return (
      <a
        className={classNames}
        href={RouteUtils.getPathForLang(ViewRoute.Experience, $lang)}
      >
        {content}
      </a>
    );
  };

  return (
    position && (
      <div className="flex flex-col h-full text-sm">
        <div className="flex justify-between items-end gap-x-5">
          <div className="flex basis-5/6 items-center border-y-2 border-darkslategray text-base">
            <div className="text-lg font-bold bg-steelblue/60 px-5 py-1">
              #{props.positionId}&nbsp;{position.company}
            </div>
            <div className="flex-auto pl-7">
              {$i18n.enums.positionRole[position.role]}&nbsp;/&nbsp;
              {$i18n.enums.positionType[position.type]}
            </div>
            <div className="pr-7">{FormatWorkPeriod(position, $i18n)}</div>
          </div>

          <div className="flex items-center text-steelblue text-right text-nowrap">
            {backEl()}
            &nbsp;{$i18n.core.or} &lt;{$i18n.core.backspace}&gt;
          </div>
        </div>

        <div className="flex-auto flex flex-col overflow-hidden">
          <div className="border-b border-darkslategray">
            <div className="bg-darkslategray px-2 py-1 w-fit">
              {$i18n.experience.positionDescription}
            </div>
          </div>
          <div className="flex-auto px-5 py-3 overflow-hidden">
            <p className="overflow-y-auto max-h-full">
              {positionInfo?.description}
            </p>
          </div>
        </div>

        <div className="flex">
          {company && (
            <div className="basis-1/3 border-r border-darkslategray">
              <div>
                <div className="border-y border-darkslategray">
                  <div className="bg-darkslategray px-2 py-1 w-fit">
                    {$i18n.experience.companyInfo}
                  </div>
                </div>
                <div className="flex flex-wrap px-5 py-3 gap-y-3">
                  <div
                    className="flex-auto"
                    style={{
                      backgroundColor: company.logoWrapColor,
                    }}
                  >
                    {company.logo && (
                      <company.logo className="aspect-video w-1/2 h-full mx-auto" />
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 w-full">
                    <div className="flex flex-col">
                      <span className="text-lightseagreen font-bold">
                        {$i18n.experience.sector}
                      </span>
                      <span>{$i18n.enums.companySector[company.sector]}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-lightseagreen font-bold">
                        {$i18n.experience.location}
                      </span>
                      <span>{company.location}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-lightseagreen font-bold">
                        {$i18n.experience.size}
                      </span>
                      <span>{$i18n.enums.companySize[company.size]}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-lightseagreen font-bold">
                        {$i18n.experience.country}
                      </span>
                      <span>{company.country}</span>
                    </div>
                  </div>

                  <div className="flex-auto">
                    <span className="text-lightseagreen font-bold">
                      {$i18n.experience.introduction}
                    </span>
                    <p>{$i18n.companiesDetails[position.company]}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {positionInfo && (
            <div className="basis-2/3 flex flex-col">
              <div className="basis-2/5">
                <div className="border-y border-darkslategray">
                  <div className="bg-darkslategray px-2 py-1 w-fit">
                    {$i18n.experience.accomplishments}
                  </div>
                </div>
                <div className="px-5 py-3">
                  <div className="flex">
                    <div className="flex-1">
                      <span className="text-lightseagreen font-bold lowercase">
                        {$i18n.enums.positionRole[PositionRole.Frontend]}
                      </span>
                      <ul>
                        {positionInfo.feAccomplishments.length ? (
                          positionInfo.feAccomplishments.map((e) => (
                            <li key={e}>{e}</li>
                          ))
                        ) : (
                          <li className="opacity-60">{$i18n.core.na}</li>
                        )}
                      </ul>
                    </div>

                    <div className="flex-1">
                      <span className="text-lightseagreen font-bold lowercase">
                        {$i18n.enums.positionRole[PositionRole.Backend]}
                      </span>
                      <ul>
                        {positionInfo.beAccomplishments.length ? (
                          positionInfo.beAccomplishments.map((e) => (
                            <li key={e}>{e}</li>
                          ))
                        ) : (
                          <li className="opacity-60">{$i18n.core.na}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="basis-3/5">
                <div className="border-y border-darkslategray">
                  <div className="bg-darkslategray px-2 py-1 w-fit">
                    {$i18n.experience.developmentEnvironment}
                  </div>
                </div>
                <div className="px-5 py-3">
                  <div className="flex">
                    <div className="flex-1">
                      <span className="text-lightseagreen font-bold lowercase">
                        {$i18n.enums.positionRole[PositionRole.Frontend]}
                      </span>
                      <ul>
                        {position.feDevTools.length ? (
                          position.feDevTools.map((e) => <li key={e}>{e}</li>)
                        ) : (
                          <li className="opacity-60">{$i18n.core.na}</li>
                        )}
                      </ul>
                    </div>
                    <div className="flex-1">
                      <span className="text-lightseagreen font-bold lowercase">
                        {$i18n.enums.positionRole[PositionRole.Backend]}
                      </span>
                      <ul>
                        {position.beDevTools.length ? (
                          position.beDevTools.map((e) => <li key={e}>{e}</li>)
                        ) : (
                          <li className="opacity-60">{$i18n.core.na}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <KeyListener />
      </div>
    )
  );
}
