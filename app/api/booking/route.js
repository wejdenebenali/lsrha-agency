import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, phone, message, recipientEmail } =
      await request.json();

    if (!name || !email || !phone || !recipientEmail) {
      return NextResponse.json(
        { error: "Champs manquants." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY manquant dans .env.local");
      return NextResponse.json(
        { error: "Configuration email manquante côté serveur." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      // "onboarding@resend.dev" fonctionne sans domaine vérifié, mais
      // Resend limite alors l'envoi à l'adresse du compte créé.
      // Une fois un domaine vérifié dans Resend, remplacer par
      // quelque chose comme "reservation@lsrha.tn".
      from: "LSRHA Agency <contact@lsrha-agency.com>",
      to: "contact@lsrha-agency.com",
      replyTo: email,
      subject: `Nouvelle demande de contact — ${name}`,
      text:
        `Nom : ${name}\n` +
        `Email : ${email}\n` +
        `Téléphone : ${phone}\n\n` +
        `Message :\n${message || "(aucun message)"}`,
    });

    if (error) {
      console.error("Erreur Resend :", error);
      return NextResponse.json(
        { error: "L'envoi a échoué." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur route /api/booking :", error);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}
