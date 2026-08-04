export default {
  name: "headerSettings",
  title: "En-tête du site",
  type: "document",
  fields: [
    {
      name: "logo",
      title: "Logo (couronne)",
      type: "image",
    },
    { name: "brandName", title: "Nom de l'agence", type: "string" },
    { name: "tagline", title: "Slogan sous le nom", type: "string" },
    {
      name: "navLinks",
      title: "Liens du menu",
      type: "array",
      of: [
        {
          type: "object",
          name: "navLink",
          fields: [
            { name: "label", title: "Texte affiché", type: "string" },
            {
              name: "href",
              title: "Lien (ex: /services)",
              type: "string",
            },
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    },
  ],
};
