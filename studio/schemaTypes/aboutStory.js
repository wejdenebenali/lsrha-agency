export default {
  name: "aboutStory",
  title: "À propos — Notre histoire",
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
      description: "Exemple : Une histoire de",
    },
    {
      name: "titleHighlight",
      title: "Titre (partie en couleur)",
      type: "string",
      description: "Exemple : passion et de confiance.",
    },
    {
      name: "paragraphs",
      title: "Paragraphes du texte",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      description: "Un paragraphe par ligne.",
    },
    {
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "highlights",
      title: "Les 3 points clés (avec icône)",
      type: "array",
      of: [
        {
          type: "object",
          name: "highlight",
          fields: [
            { name: "title", title: "Titre", type: "string" },
            { name: "description", title: "Description", type: "string" },
            {
              name: "icon",
              title: "Icône",
              type: "string",
              options: {
                list: [
                  { title: "Cible (stratégie)", value: "Target" },
                  { title: "Étincelles (créativité)", value: "Sparkles" },
                  { title: "Fusée (performance)", value: "Rocket" },
                ],
              },
            },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    },
  ],
};
