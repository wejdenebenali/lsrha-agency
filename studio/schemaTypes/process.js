export default {
  name: "process",
  title: "Accueil — Notre méthode",
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
      description: "Exemple : Une collaboration claire,",
    },
    {
      name: "titleHighlight",
      title: "Titre (partie en couleur)",
      type: "string",
      description: "Exemple : jusqu'au résultat.",
    },
    {
      name: "description",
      title: "Texte de description",
      type: "text",
      rows: 3,
    },
    {
      name: "steps",
      title: "Étapes",
      type: "array",
      of: [
        {
          type: "object",
          name: "step",
          fields: [
            { name: "number", title: "Numéro affiché", type: "string" },
            { name: "title", title: "Titre", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 2 },
            {
              name: "icon",
              title: "Icône",
              type: "string",
              options: {
                list: [
                  { title: "Loupe (découverte)", value: "Search" },
                  { title: "Graphique (stratégie)", value: "BarChart3" },
                  { title: "Étincelles (création)", value: "Sparkles" },
                  { title: "Code (développement)", value: "Code2" },
                  { title: "Fusée (lancement)", value: "Rocket" },
                  { title: "Casque (suivi)", value: "Headphones" },
                ],
              },
            },
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
      ],
    },
  ],
};
