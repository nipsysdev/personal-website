import type { I18nEnums } from "../i18nTypes.ts";
import {
  CompanySector,
  CompanySize,
  PositionRole,
  PositionType,
} from "../../types/work.ts";
import { ViewRoute } from "../../types/viewRoute.ts";

export default {
  viewRoute: {
    [ViewRoute.Terminal]: "Terminal",
    [ViewRoute.Whoami]: "Qui suis-je",
    [ViewRoute.Experience]: "Expérience",
    [ViewRoute.Blog]: "Blog",
    [ViewRoute.Contact]: "Contact",
  },
  companySector: {
    [CompanySector.RealEstate]: "Immobilier",
    [CompanySector.ItConsulting]: "Conseil en informatique",
    [CompanySector.Telecommunications]: "Télécommunications",
    [CompanySector.BlockchainServices]: "Services Blockchain",
  },
  companySize: {
    [CompanySize.XS]: "1-10 employés",
    [CompanySize.SM]: "11-50 employés",
    [CompanySize.MD]: "51-200 employés",
    [CompanySize.LG]: "201-500 employés",
    [CompanySize.XL]: "501-1 000 employés",
    [CompanySize.XXL]: "1 001-5 000 employés",
    [CompanySize.XXXL]: "5 001-10 000 employés",
    [CompanySize.XXXXL]: "10 000+ employés",
  },
  positionRole: {
    [PositionRole.Backend]: "Back-End",
    [PositionRole.Frontend]: "Front-End",
    [PositionRole.FullStack]: "Full-Stack",
  },
  positionType: {
    [PositionType.FullTime]: "Temps plein",
    [PositionType.PartTime]: "Temps partiel",
    [PositionType.WorkStudy]: "Travail-études",
    [PositionType.Internship]: "Stage",
  },
} satisfies I18nEnums;
