export default {
  name: "whyUs",
  title: "Accueil — Pourquoi nous choisir",
  type: "document",
  fields: [
    {
      name: "eyebrow",
      title: "Petit texte au-dessus du titre",
      type: "string",
    },
    {
      name: "title",
      title: "Titre de la section (1ère partie)",
      type: "string",
      description: "Exemple : Pourquoi choisir",
    },
    {
      name: "titleHighlight",
      title: "Titre de la section (partie en couleur)",
      type: "string",
      description: "Exemple : LSRHA Agency ?",
    },
    {
      name: "description",
      title: "Texte de description",
      type: "text",
      rows: 3,
    },
    {
      name: "cards",
      title: "Cartes (les avantages)",
      type: "array",
      of: [
        {
          type: "object",
          name: "card",
          fields: [
            { name: "title", title: "Titre", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 3 },
            {
              name: "icon",
              title: "Icône",
              type: "string",
              options: {
                list: [
                  { title: "Cible (stratégie)", value: "Target" },
                  { title: "Éclair (rapidité)", value: "Zap" },
                  { title: "Crayon (créativité)", value: "Pencil" },
                  { title: "Graphique (résultats)", value: "BarChart3" },
                  { title: "Poignée de main (accompagnement)", value: "Handshake" },
                  { title: "Bulle (transparence)", value: "MessageCircle" },
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
