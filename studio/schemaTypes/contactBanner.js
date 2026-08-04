export default {
  name: "contactBanner",
  title: "Bannière rouge de contact",
  type: "document",
  fields: [
    { name: "eyebrow", title: "Petit texte au-dessus du titre", type: "string" },
    { name: "title", title: "Titre (1ère partie)", type: "string" },
    { name: "titleHighlight", title: "Titre (partie en couleur)", type: "string" },
    { name: "description", title: "Texte de description", type: "text", rows: 3 },
    {
      name: "benefits",
      title: "Les 3 points clés",
      type: "array",
      of: [
        {
          type: "object",
          name: "benefit",
          fields: [
            { name: "title", title: "Titre", type: "string" },
            { name: "subtitle", title: "Sous-titre", type: "string" },
            {
              name: "icon",
              title: "Icône",
              type: "string",
              options: {
                list: [
                  { title: "Bouclier (réponse rapide)", value: "ShieldCheck" },
                  { title: "Coche (accompagnement)", value: "Check" },
                  { title: "Étincelles (solutions)", value: "Sparkles" },
                ],
              },
            },
          ],
          preview: { select: { title: "title", subtitle: "subtitle" } },
        },
      ],
    },
  ],
};
