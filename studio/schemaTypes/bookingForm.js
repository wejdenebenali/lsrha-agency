export default {
  name: "bookingForm",
  title: "Formulaire de réservation",
  type: "document",
  fields: [
    {
      name: "eyebrow",
      title: "Petit texte au-dessus du titre",
      type: "string",
    },
    { name: "title", title: "Titre", type: "string" },
    { name: "subtitle", title: "Texte d'introduction", type: "text", rows: 2 },
    { name: "nameLabel", title: "Libellé du champ Nom", type: "string" },
    { name: "namePlaceholder", title: "Texte d'exemple du champ Nom", type: "string" },
    { name: "emailLabel", title: "Libellé du champ Email", type: "string" },
    { name: "emailPlaceholder", title: "Texte d'exemple du champ Email", type: "string" },
    { name: "phoneLabel", title: "Libellé du champ Téléphone", type: "string" },
    { name: "phonePlaceholder", title: "Texte d'exemple du champ Téléphone", type: "string" },
    { name: "messageLabel", title: "Libellé du champ Message", type: "string" },
    {
      name: "messagePlaceholder",
      title: "Texte d'exemple du champ Message",
      type: "string",
    },
    { name: "submitButtonText", title: "Texte du bouton d'envoi", type: "string" },
  ],
};
