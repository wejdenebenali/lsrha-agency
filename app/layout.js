import "./globals.css";
import Header from "@/components/Header/Header";

export const metadata = {
  title: "LSRHA Agency — Marketing. Branding. Strategy.",
  description:
    "Agence de marketing digital à Sfax, Tunisie. Stratégie, branding, création de contenu et publicité en ligne.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@600;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body">
        <Header />
        {children}
      </body>
    </html>
  );
}
