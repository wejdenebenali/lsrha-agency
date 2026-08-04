export default {
  name: "footerContent",
  title: "Footer — Colonnes & liens",
  type: "document",
  fields: [
    {
      name: "brandDescription",
      title: "Phrase sous le logo",
      type: "text",
      rows: 2,
    },
    {
      name: "columns",
      title: "Colonnes de liens (Agence, Services, Navigation...)",
      type: "array",
      of: [
        {
          type: "object",
          name: "column",
          fields: [
            { name: "title", title: "Titre de la colonne", type: "string" },
            {
              name: "links",
              title: "Liens",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "link",
                  fields: [
                    { name: "label", title: "Texte affiché", type: "string" },
                    {
                      name: "href",
                      title: "Lien (ex: /a-propos ou #services)",
                      type: "string",
                    },
                  ],
                  preview: { select: { title: "label", subtitle: "href" } },
                },
              ],
            },
          ],
          preview: { select: { title: "title" } },
        },
      ],
    },
    {
      name: "legalLinks",
      title: "Liens légaux (bas de page)",
      type: "array",
      of: [
        {
          type: "object",
          name: "legalLink",
          fields: [
            { name: "label", title: "Texte affiché", type: "string" },
            { name: "href", title: "Lien", type: "string" },
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    },
  ],
};
