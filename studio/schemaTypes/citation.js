export default {
  name: "citation",
  title: "À propos — Citation",
  type: "document",
  fields: [
    {
      name: "quote",
      title: "Texte de la citation",
      type: "text",
      rows: 4,
    },
    {
      name: "highlight",
      title: "Passage à mettre en couleur (optionnel)",
      type: "string",
      description:
        "Doit correspondre exactement à une partie du texte ci-dessus pour être mis en rouge.",
    },
    {
      name: "author",
      title: "Signature",
      type: "string",
      description: "Exemple : — LSRHA Agency",
    },
  ],
};
