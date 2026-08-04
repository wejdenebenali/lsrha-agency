import Blog from "@/components/Blog/Blog";

export const metadata = { title: "Blog — LSRHA Agency" };

export default function BlogPage() {
  return (
    <main>
      <section className="px-6 md:px-12 py-14 bg-brand-dark text-center">
        <h1 className="font-heading text-3xl md:text-4xl text-[#F7F2E7]">Le blog</h1>
        <p className="text-[#d9c9b8] max-w-lg mx-auto mt-4 text-sm leading-relaxed">
          Conseils, tendances et bonnes pratiques en marketing digital.
        </p>
      </section>
      <Blog />
    </main>
  );
}
