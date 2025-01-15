import { useStore } from "@nanostores/react";
import {
  ShellHasIntroduced,
  ShellHasRefreshed,
  ShellHistory,
  ShellInput,
  ShellSimCmd,
  ShellSubmission,
} from "../../stores/shellStore.ts";
import { I18n, LastKeyDown } from "../../stores/coreStore.ts";
import { createRef, type KeyboardEvent, useEffect, useState } from "react";
import TerminalPrompt from "./TerminalPrompt.tsx";
import { Command, type CommandEntry } from "../../types/shell.ts";
import { ParseEntry } from "../../utils/shellUtils.ts";
import UnknownCmdOutput from "../outputs/UnknownCmdOutput.tsx";
import useKeyHandler from "../../hooks/useKeyHandler.ts";

export default function TerminalEmulator() {
  const $i18n = useStore(I18n);
  const $input = useStore(ShellInput);
  const $submission = useStore(ShellSubmission);
  const $simCmd = useStore(ShellSimCmd);
  const $history = useStore(ShellHistory);
  const $hasIntroduced = useStore(ShellHasIntroduced);
  const $lastKeyDown = useStore(LastKeyDown);

  const [fullscreenEntry, setFullscreenEntry] = useState<CommandEntry | null>(
    null,
  );
  const mainPrompt = createRef<TerminalPrompt>();

  useEffect(() => {
    mainPrompt.current?.focus();

    if (!$hasIntroduced && mainPrompt.current) {
      ShellHasIntroduced.set(true);
      mainPrompt.current?.simulate(Command.Intro);
    }
  }, [mainPrompt]);

  useEffect(() => {
    if (!$submission) return;
    ShellSubmission.set("");
    ShellHasRefreshed.set(false);

    if ($submission === "clear") {
      // TODO: Keep history, only clear terminal
      ShellHistory.set([]);
      return;
    }

    const cmdEntry = ParseEntry($submission);
    ShellHistory.set([...$history, cmdEntry]);

    if (cmdEntry.fullscreen) {
      setFullscreenEntry(cmdEntry);
    }
  }, [$submission]);

  useEffect(() => {
    setTimeout(() => {
      mainPrompt.current?.scrollIntoView();
    }, 100);
  }, [$history]);

  useEffect(() => {
    if (!$simCmd) return;
    mainPrompt.current?.simulate($simCmd);
    ShellSimCmd.set("");
  }, [$simCmd]);

  useEffect(() => {
    if (!$input) return;
    mainPrompt.current?.setInput($input);
    ShellInput.set("");
  }, [$input]);

  useKeyHandler((event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "c") {
      return exitFullscreen();
    }
  });

  const exitFullscreen = () => {
    setFullscreenEntry(null);
  };

  const standardView = (
    <div
      role="button"
      tabIndex={0}
      className="size-full flex flex-col cursor-default"
      onKeyDown={() => {}}
      onClick={() => mainPrompt.current?.focus()}
    >
      {$history.map((entry) => (
        <div key={entry.timestamp}>
          <TerminalPrompt i18nContent={$i18n} entry={entry} />
          {entry.fullscreen ? null : entry.output ? (
            <entry.output entry={entry} i18nContent={$i18n} />
          ) : (
            <UnknownCmdOutput cmdName={entry.cmdName} />
          )}
        </div>
      ))}
      <TerminalPrompt
        ref={mainPrompt}
        i18nContent={$i18n}
        history={$history}
        lastKeyDown={$lastKeyDown}
      />
    </div>
  );

  const fullscreenView = (entry: CommandEntry) =>
    entry.output && (
      <div className="size-full flex flex-col gap-3">
        <div className="flex-auto overflow-hidden">
          <entry.output entry={entry} i18nContent={$i18n} />
        </div>

        <div className="flex text-steelblue">
          <div className="flex-auto flex items-center justify-end text-sm">
            {$i18n.shell.fullScreenMode}&nbsp;/&nbsp;
            <button
              className="font-bold text-darkgoldenrod cursor-pointer text-base"
              onClick={exitFullscreen}
            >
              [{$i18n.core.exit}]
            </button>
            &nbsp;{$i18n.core.or}&nbsp;&lt;{$i18n.core.ctrlc}&gt;
          </div>
        </div>
      </div>
    );

  return (
    <div className="size-full overflow-y-scroll select-none text-sm sm:text-base">
      {fullscreenEntry ? fullscreenView(fullscreenEntry) : standardView}
    </div>
  );
}
