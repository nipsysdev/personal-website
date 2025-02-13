import type { I18nEnums } from "../i18nTypes.ts";
import {
  CompanySector,
  CompanySize,
  PositionRole,
  PositionType,
} from "../../types/work.ts";
import { ViewRoute } from "../../types/routing.ts";

export default {
  viewRoute: {
    [ViewRoute.Terminal]: "Terminal",
    [ViewRoute.Whoami]: "Whoami",
    [ViewRoute.Experience]: "Experience",
    [ViewRoute.Blog]: "Blog",
    [ViewRoute.Contact]: "Contact",
  },
  companySector: {
    [CompanySector.RealEstate]: "Real Estate",
    [CompanySector.ItConsulting]: "IT Consulting",
    [CompanySector.Telecommunications]: "Telecommunications",
    [CompanySector.BlockchainServices]: "Blockchain Services",
  },
  companySize: {
    [CompanySize.XS]: "1-10 employees",
    [CompanySize.SM]: "11-50 employees",
    [CompanySize.MD]: "51-200 employees",
    [CompanySize.LG]: "201-500 employees",
    [CompanySize.XL]: "501-1 000 employees",
    [CompanySize.XXL]: "1 001-5 000 employees",
    [CompanySize.XXXL]: "5 001-10 000 employees",
    [CompanySize.XXXXL]: "10 000+ employees",
  },
  positionRole: {
    [PositionRole.Backend]: "Back-End",
    [PositionRole.Frontend]: "Front-End",
    [PositionRole.FullStack]: "Full-Stack",
  },
  positionType: {
    [PositionType.FullTime]: "Full-Time",
    [PositionType.PartTime]: "Part-Time",
    [PositionType.WorkStudy]: "Work-Study",
    [PositionType.Internship]: "Internship",
  },
} satisfies I18nEnums;
