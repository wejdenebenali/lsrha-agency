export default {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    {
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      description: "1 = premier service affiché, 2 = deuxième, etc.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "number",
      title: "Numéro affiché",
      type: "string",
      description: "Exemple : 01, 02, 03...",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "title",
      title: "Titre du service",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Sous-titre (phrase d'accroche)",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    },
    {
      name: "features",
      title: "Points forts (liste à puces)",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "alt",
      title: "Texte alternatif de l'image",
      type: "string",
      description: "Décrit l'image pour l'accessibilité et le référencement.",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "image",
    },
  },
};
