export default {
  name: "contactInfo",
  title: "Coordonnées",
  type: "document",
  fields: [
    {
      name: "phones",
      title: "Numéros de téléphone",
      type: "array",
      of: [
        {
          type: "object",
          name: "phone",
          fields: [
            {
              name: "value",
              title: "Numéro affiché",
              type: "string",
              description: "Exemple : +216 99676211",
            },
          ],
          preview: { select: { title: "value" } },
        },
      ],
    },
    {
      name: "email",
      title: "Adresse email",
      type: "string",
    },
    {
      name: "whatsapp",
      title: "Numéro WhatsApp",
      type: "string",
      description: "Uniquement les chiffres, avec l'indicatif. Exemple : 21699676211",
    },
    {
      name: "addressLines",
      title: "Adresse (une ligne par entrée)",
      type: "array",
      of: [{ type: "string" }],
      description: "Exemple : 'Route Tunis Km 9, Cité Ons 5' puis 'Sfax, Sakiet Ezzit 3021'",
    },
    {
      name: "facebookUrl",
      title: "Lien Facebook",
      type: "url",
      description: "Laisser vide pour masquer l'icône.",
    },
    {
      name: "instagramUrl",
      title: "Lien Instagram",
      type: "url",
      description: "Laisser vide pour masquer l'icône.",
    },
  ],
};
