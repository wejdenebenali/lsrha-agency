import service from "./service";
import teamMember from "./teamMember";
import hero from "./hero";
import whyUs from "./whyUs";
import contactInfo from "./contactInfo";
import citation from "./citation";
import process from "./process";
import realisations from "./realisations";
import aboutStory from "./aboutStory";
import footerContent from "./footerContent";
import bookingForm from "./bookingForm";
import headerSettings from "./headerSettings";
import contactBanner from "./contactBanner";
import contactPageIntro from "./contactPageIntro";

export const schemaTypes = [
  service,
  teamMember,
  hero,
  whyUs,
  contactInfo,
  citation,
  process,
  realisations,
  aboutStory,
  footerContent,
  bookingForm,
  headerSettings,
  contactBanner,
  contactPageIntro,
];

export const singletonTypes = [
  "hero",
  "whyUs",
  "contactInfo",
  "citation",
  "process",
  "realisations",
  "aboutStory",
  "footerContent",
  "bookingForm",
  "headerSettings",
  "contactBanner",
  "contactPageIntro",
];
