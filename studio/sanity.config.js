import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schemaTypes, singletonTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "LSRHA Agency",

  projectId: "amt3dt21",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenu du site")
          .items([
            S.listItem()
              .title("Accueil — Hero")
              .child(
                S.document().schemaType("hero").documentId("hero")
              ),
            S.listItem()
              .title("Accueil — Pourquoi nous choisir")
              .child(
                S.document().schemaType("whyUs").documentId("whyUs")
              ),
            S.listItem()
              .title("Coordonnées")
              .child(
                S.document()
                  .schemaType("contactInfo")
                  .documentId("contactInfo")
              ),
            S.listItem()
              .title("À propos — Citation")
              .child(
                S.document().schemaType("citation").documentId("citation")
              ),
            S.listItem()
              .title("À propos — Notre histoire")
              .child(
                S.document()
                  .schemaType("aboutStory")
                  .documentId("aboutStory")
              ),
            S.listItem()
              .title("Accueil — Notre méthode")
              .child(
                S.document().schemaType("process").documentId("process")
              ),
            S.listItem()
              .title("Accueil — Nos réalisations")
              .child(
                S.document()
                  .schemaType("realisations")
                  .documentId("realisations")
              ),
            S.listItem()
              .title("Footer — Colonnes & liens")
              .child(
                S.document()
                  .schemaType("footerContent")
                  .documentId("footerContent")
              ),
            S.listItem()
              .title("Formulaire de réservation")
              .child(
                S.document()
                  .schemaType("bookingForm")
                  .documentId("bookingForm")
              ),
            S.listItem()
              .title("En-tête du site (header)")
              .child(
                S.document()
                  .schemaType("headerSettings")
                  .documentId("headerSettings")
              ),
            S.listItem()
              .title("Bannière rouge de contact")
              .child(
                S.document()
                  .schemaType("contactBanner")
                  .documentId("contactBanner")
              ),
            S.listItem()
              .title("Page Contact — Bandeau du haut")
              .child(
                S.document()
                  .schemaType("contactPageIntro")
                  .documentId("contactPageIntro")
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !singletonTypes.includes(item.getId())
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
