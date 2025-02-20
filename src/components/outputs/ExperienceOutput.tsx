import { Component } from "react";
import { type CommandOutputProps } from "../../types/shell.ts";
import PositionList from "../position/PositionList.tsx";

export default class ExperienceOutput extends Component<CommandOutputProps> {
  render() {
    return <PositionList />;
  }
}
