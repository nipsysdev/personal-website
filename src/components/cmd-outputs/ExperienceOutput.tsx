import { Component } from "react";
import { type CommandOutputProps } from "../../types/shell.ts";
import ExperienceList from "../experience/ExperienceList.tsx";

export default class ExperienceOutput extends Component<CommandOutputProps> {
  render() {
    return <ExperienceList />;
  }
}
