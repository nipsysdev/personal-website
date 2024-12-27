import type { CommandArgument, CommandInfo } from "../../types/shell.ts";
import { ShellInput, ShellSimCmd } from "../../stores/shellStore.ts";
import type { JSX } from "react";

interface Props {
  cmdName?: string;
  cmdInfo?: CommandInfo;
  arg?: CommandArgument;
}

export default function CmdLink(props: Props) {
  const submitCmd = () => {
    const cmd = props.cmdName ?? props.cmdInfo?.name ?? "";
    if (!cmd) return;

    if (props.cmdInfo?.options?.length) {
      ShellInput.set(`${cmd} `);
      return;
    }
    if (props.arg) {
      ShellInput.set(`${cmd} --${props.arg.name}=`);
      return;
    }

    ShellSimCmd.set(cmd);
  };

  const cmdArgOptionRender = (): JSX.Element => {
    if (!props.cmdInfo) return <></>;

    if (props.arg && props.arg.options) {
      let options = props.arg.options.slice(0, 6).join("|");
      options += props.arg.options.length > 6 ? "|..." : "";
      return (
        <>
          --{props.arg.name}=<span className="text-darkgray">{options}</span>
        </>
      );
    }

    if (props.cmdInfo.options) {
      const options = props.cmdInfo.options.join("|");
      return <span className="text-darkgray">&nbsp;{options}</span>;
    }

    return <></>;
  };

  return (
    <button
      className="font-bold text-darkgoldenrod cursor-pointer inline-flex"
      onClick={submitCmd}
    >
      <span>[{props.cmdName ?? props.cmdInfo?.name}</span>
      {cmdArgOptionRender()}]
    </button>
  );
}
