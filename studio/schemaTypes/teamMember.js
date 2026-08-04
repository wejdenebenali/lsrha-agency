export default {
  name: "teamMember",
  title: "Membre de l'équipe",
  type: "document",
  fields: [
    {
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      description: "1 = premier affiché, 2 = deuxième, etc.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "title",
      title: "Rôle / poste",
      type: "string",
      description: "Exemple : Designer Graphique",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Sous-titre",
      type: "string",
      description: "Exemple : Créativité & identité visuelle",
    },
    {
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "alt",
      title: "Texte alternatif de l'image",
      type: "string",
    },
    {
      name: "icon",
      title: "Icône",
      type: "string",
      description: "Choisis l'icône qui représente le mieux ce rôle.",
      options: {
        list: [
          { title: "Palette (design)", value: "Palette" },
          { title: "Code (développement)", value: "Code2" },
          { title: "Caméra (contenu)", value: "Camera" },
          { title: "Partage (réseaux sociaux)", value: "Share2" },
          { title: "Graphique (données)", value: "BarChart3" },
          { title: "Robot (IA / automatisation)", value: "Bot" },
          { title: "Tendance (marketing)", value: "TrendingUp" },
          { title: "Boussole (stratégie de marque)", value: "Compass" },
          { title: "Dollar (achat média)", value: "DollarSign" },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "image",
    },
  },
};
