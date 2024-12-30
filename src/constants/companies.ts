import {
  Company,
  type CompanyInfo,
  CompanySector,
  CompanySize,
} from "../types/work.ts";
import bellLogo from "../assets/logos/bell.webp";
import chainifyLogo from "../assets/logos/chainify.webp";
import renaultDigitalLogo from "../assets/logos/renault-digital.webp";
import yanportLogo from "../assets/logos/yanport.webp";

export const Companies: Record<Company, CompanyInfo> = {
  Yanport: {
    logo: yanportLogo.src,
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
    logo: renaultDigitalLogo.src,
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
    logo: bellLogo.src,
    logoWrapColor: "#295296",
    location: "Montréal, Québec",
    country: "Canada",
    size: CompanySize.XXXXL,
    sector: CompanySector.Telecommunications,
  },
  [Company.Chainify]: {
    logo: chainifyLogo.src,
    logoWrapColor: "#000",
    location: "Sheridan, Wyoming",
    country: "United-States",
    size: CompanySize.SM,
    sector: CompanySector.BlockchainServices,
  },
};