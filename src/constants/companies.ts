import {
  Company,
  type CompanyInfo,
  CompanySector,
  CompanySize,
} from "../types/work.ts";
import BellLogo from "../components/svg/BellLogo.tsx";
import ChainifyLogo from "../components/svg/ChainifyLogo.tsx";
import RenaultDigitalLogo from "../components/svg/RenaultDigitalLogo.tsx";
import YanportLogo from "../components/svg/YanportLogo.tsx";

export const Companies: Record<Company, CompanyInfo> = {
  Yanport: {
    logo: YanportLogo,
    logoWrapColor: "#1b46a5",
    location: "Levallois-Perret, Hauts-de-Seine",
    country: "France",
    size: CompanySize.SM,
    sector: CompanySector.RealEstate,
  },
  Onepoint: {
    location: "Paris, Île-de-France",
    country: "France",
    size: CompanySize.XXL,
    sector: CompanySector.ItConsulting,
  },
  [Company.RenaultDigital]: {
    logo: RenaultDigitalLogo,
    logoWrapColor: "#000",
    location: "Boulogne-Billancourt, Hauts-de-Seine",
    country: "France",
    size: CompanySize.MD,
    sector: CompanySector.ItConsulting,
  },
  Talan: {
    location: "Montréal, Québec",
    country: "Canada",
    size: CompanySize.XXXL,
    sector: CompanySector.ItConsulting,
  },
  Bell: {
    logo: BellLogo,
    logoWrapColor: "#295296",
    location: "Montréal, Québec",
    country: "Canada",
    size: CompanySize.XXXXL,
    sector: CompanySector.Telecommunications,
  },
  [Company.Chainify]: {
    logo: ChainifyLogo,
    logoWrapColor: "#000",
    location: "Sheridan, Wyoming",
    country: "United-States",
    size: CompanySize.SM,
    sector: CompanySector.BlockchainServices,
  },
};
