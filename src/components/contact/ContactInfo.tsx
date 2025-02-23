import { Component } from "react";
import { type CommandOutputProps } from "../../types/shell.ts";

export default function ContactInfo() {
  return <div># todo : list contact info</div>;
}

export class ContactOutput extends Component<CommandOutputProps> {
  render() {
    return <ContactInfo />;
  }
}
