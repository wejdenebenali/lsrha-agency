export const servicesQuery = `
  *[_type == "service"] | order(order asc) {
    _id,
    number,
    title,
    subtitle,
    description,
    features,
    "image": image.asset->url,
    alt
  }
`;

export const teamMembersQuery = `
  *[_type == "teamMember"] | order(order asc) {
    _id,
    title,
    subtitle,
    "image": image.asset->url,
    alt,
    icon
  }
`;

export const heroQuery = `
  *[_type == "hero"][0] {
    "heroImage": heroImage.asset->url,
    eyebrow,
    title,
    titleHighlight,
    description,
    primaryButtonText,
    secondaryButtonText,
    stats
  }
`;

export const whyUsQuery = `
  *[_type == "whyUs"][0] {
    eyebrow,
    title,
    titleHighlight,
    description,
    cards
  }
`;

export const contactInfoQuery = `
  *[_type == "contactInfo"][0] {
    phones,
    email,
    whatsapp,
    addressLines,
    facebookUrl,
    instagramUrl
  }
`;

export const aboutStoryQuery = `
  *[_type == "aboutStory"][0] {
    eyebrow,
    title,
    titleHighlight,
    paragraphs,
    "image": image.asset->url,
    highlights
  }
`;

export const citationQuery = `
  *[_type == "citation"][0] {
    quote,
    highlight,
    author
  }
`;

export const processQuery = `
  *[_type == "process"][0] {
    eyebrow,
    title,
    titleHighlight,
    description,
    steps
  }
`;

export const realisationsQuery = `
  *[_type == "realisations"][0] {
    eyebrow,
    title,
    titleHighlight,
    description,
    logos[] {
      name,
      "image": image.asset->url
    }
  }
`;

export const footerContentQuery = `
  *[_type == "footerContent"][0] {
    brandDescription,
    columns,
    legalLinks
  }
`;

export const bookingFormQuery = `
  *[_type == "bookingForm"][0] {
    eyebrow,
    title,
    subtitle,
    nameLabel,
    namePlaceholder,
    emailLabel,
    emailPlaceholder,
    phoneLabel,
    phonePlaceholder,
    messageLabel,
    messagePlaceholder,
    submitButtonText
  }
`;

export const headerSettingsQuery = `
  *[_type == "headerSettings"][0] {
    "logo": logo.asset->url,
    brandName,
    tagline,
    navLinks
  }
`;

export const contactBannerQuery = `
  *[_type == "contactBanner"][0] {
    eyebrow,
    title,
    titleHighlight,
    description,
    benefits
  }
`;

export const contactPageIntroQuery = `
  *[_type == "contactPageIntro"][0] {
    title,
    subtitle
  }
`;
