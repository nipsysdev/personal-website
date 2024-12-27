import { Component } from "react";
import { type CommandOutputProps } from "../../types/shell.ts";
import Commands from "../../shell/commands.ts";
import CmdLink from "../core/CmdLink.tsx";

export default class HelpOutput extends Component<CommandOutputProps> {
  render() {
    return Commands.map((cmd) => (
      <div key={cmd.name} className="flex flex-col leading-5 my-2">
        <span className="text-olivedrab text-sm">
          - {this.props.i18nContent.cmdDesc[cmd.name].description}
        </span>
        <CmdLink cmdInfo={cmd} />

        {(cmd.arguments ?? []).map((arg) => (
          <div key={arg.name} className="flex flex-col leading-5 mt-3">
            <span className="text-olivedrab text-sm">
              - {this.props.i18nContent.cmdDesc[cmd.name].argsDesc?.[arg.name]}
            </span>

            <CmdLink cmdInfo={cmd} arg={arg} />
          </div>
        ))}
      </div>
    ));
  }
}
