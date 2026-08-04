export default {
  name: "hero",
  title: "Accueil — Hero",
  type: "document",
  fields: [
    {
      name: "heroImage",
      title: "Photo (à droite du texte)",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "eyebrow",
      title: "Petit texte au-dessus du titre",
      type: "string",
    },
    {
      name: "title",
      title: "Titre principal (1ère partie)",
      type: "string",
      description: "Exemple : Nous donnons vie à",
    },
    {
      name: "titleHighlight",
      title: "Titre principal (partie en couleur)",
      type: "string",
      description: "Exemple : votre vision",
    },
    {
      name: "description",
      title: "Texte de description",
      type: "text",
      rows: 4,
    },
    {
      name: "primaryButtonText",
      title: "Texte du bouton rouge",
      type: "string",
    },
    {
      name: "secondaryButtonText",
      title: "Texte du bouton contour",
      type: "string",
    },
    {
      name: "stats",
      title: "Chiffres clés (les 4 cases en bas)",
      type: "array",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            {
              name: "value",
              title: "Chiffre",
              type: "string",
              description: "Exemple : 150+, 24/7...",
            },
            {
              name: "label",
              title: "Libellé",
              type: "string",
              description: "Exemple : Clients accompagnés",
            },
            {
              name: "icon",
              title: "Icône",
              type: "string",
              options: {
                list: [
                  { title: "Personnes", value: "Users" },
                  { title: "Fusée", value: "Rocket" },
                  { title: "Graphique", value: "BarChart3" },
                  { title: "Casque (support)", value: "Headphones" },
                ],
              },
            },
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
    },
  ],
};
