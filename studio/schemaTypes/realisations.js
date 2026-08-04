export default {
  name: "realisations",
  title: "Accueil — Nos réalisations",
  type: "document",
  fields: [
    {
      name: "eyebrow",
      title: "Petit texte au-dessus du titre",
      type: "string",
    },
    {
      name: "title",
      title: "Titre (1ère partie)",
      type: "string",
      description: "Exemple : Nos",
    },
    {
      name: "titleHighlight",
      title: "Titre (partie en couleur)",
      type: "string",
      description: "Exemple : réalisations",
    },
    {
      name: "description",
      title: "Texte de description",
      type: "text",
      rows: 3,
    },
    {
      name: "logos",
      title: "Logos clients",
      type: "array",
      of: [
        {
          type: "object",
          name: "logo",
          fields: [
            { name: "name", title: "Nom du client", type: "string" },
            {
              name: "image",
              title: "Logo",
              type: "image",
              options: { hotspot: true },
            },
          ],
          preview: {
            select: { title: "name", media: "image" },
          },
        },
      ],
    },
  ],
};
