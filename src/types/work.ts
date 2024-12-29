import type { DisplayableData } from "./common.ts";

export enum Company {
  Yanport = "Yanport",
  Onepoint = "Onepoint",
  RenaultDigital = "Renault Digital",
  Talan = "Talan",
  Bell = "Bell",
  Chainify = "Chainify Labs",
}

export enum CompanySector {
  RealEstate = "Real-Estate",
  ItConsulting = "It-Consulting",
  Telecommunications = "Telecommunications",
  BlockchainServices = "BlockchainServices",
}

export enum CompanySize {
  XS = "XS",
  SM = "SM",
  MD = "MD",
  LG = "LG",
  XL = "XL",
  XXL = "XXL",
  XXXL = "XXXL",
  XXXXL = "XXXXL",
}

export enum PositionRole {
  Backend = "Back-End",
  Frontend = "Front-End",
  FullStack = "Full-Stack",
}

export enum PositionType {
  FullTime = "Full-Time",
  PartTime = "Part-Time",
  WorkStudy = "Work-Study",
  Internship = "Internship",
}

export enum DevTool {
  Angular = "Angular",
  AngularJS = "AngularJS",
  AngularMaterial = "AngularMaterial",
  AzureFunctions = "Azure Functions",
  Bootstrap = "Bootstrap",
  Blockchain = "Blockchain",
  Cassandra = "Cassandra",
  CSharp = "C#",
  CSSFlexbox = "CSSFlexbox",
  CSSGrid = "CSSGrid",
  Datastore = "Datastore",
  DaisyUI = "DaisyUI",
  Elasticsearch = "Elasticsearch",
  Element = "Element",
  ElementPlus = "ElementPlus",
  Java = "Java",
  Javascript = "Javascript",
  Jsoup = "Jsoup",
  NextJS = "Next.js",
  PWA = "PWA",
  RabbitMq = "RabbitMq",
  React = "React",
  Redux = "Redux",
  Responsive = "Responsive",
  SCSS = "SCSS",
  Serverless = "Serverless",
  Storybook = "Storybook",
  SSR = "SSR",
  TailwindCSS = "TailwindCSS",
  Typescript = "Typescript",
  Vue2 = "Vue2",
  Vue3 = "Vue3",
  Web3 = "Web3",
}

export interface Position {
  id: number;
  company: Company;
  consultingFirm?: Company;
  role: PositionRole;
  isLeadRole: boolean;
  type: PositionType;
  mainDevTool: DevTool;
  feDevTools: DevTool[];
  beDevTools: DevTool[];
  period: [Date, Date?];
  [key: string]: DisplayableData;
}
