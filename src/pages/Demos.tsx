import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OnboardingModal } from "@/components/OnboardingModal";

type Category = "Tous" | "Landing Page" | "E-commerce" | "Agent IA WhatsApp" | "Agent Vocal IA" | "Chatbot Web" | "SaaS Prospection";

type Template = {
  title: string;
  category: Exclude<Category, "Tous">;
  description: string;
  preview: string; // image url
  url: string;     // live demo url
};

type Video = {
  title: string;
  category: Exclude<Category, "Tous">;
  // YouTube embed URL (use /embed/ID)
  embed: string;
};

const CATEGORIES: Category[] = ["Tous", "Landing Page", "E-commerce", "Agent IA WhatsApp", "Agent Vocal IA", "Chatbot Web", "SaaS Prospection"];

const TEMPLATES: Template[] = [
  {
    title: "Landing SaaS Minimaliste",
    category: "Landing Page",
    description: "Hero centré, social proof, sections produit, CTA unique. Idéal pour startup / SaaS.",
    preview: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80",
    url: "https://delmarwebstudios.vercel.app",
  },
  {
    title: "Landing Coach & Formation",
    category: "Landing Page",
    description: "Page dédiée à un infoproduit : promesse, témoignages, programme, paiement.",
    preview: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
    url: "https://sauvonstonexam.com",
  },
  {
    title: "Boutique Mode Express",
    category: "E-commerce",
    description: "Catalogue produit + panier + checkout Mobile Money. Lancée en 7 jours.",
    preview: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
    url: "https://example-shop.vercel.app",
  },
  {
    title: "Agent WhatsApp Restaurant",
    category: "Agent IA WhatsApp",
    description: "Prend les commandes 24/7, calcule le total, envoie la confirmation.",
    preview: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=1200&q=80",
    url: "https://wa.me/237655671935?text=Bonjour",
  },
  {
    title: "Agent WhatsApp Immobilier",
    category: "Agent IA WhatsApp",
    description: "Qualifie le prospect, envoie les fiches biens, planifie la visite.",
    preview: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    url: "https://wa.me/237655671935?text=Demo%20immo",
  },
  {
    title: "Standard Vocal IA Clinique",
    category: "Agent Vocal IA",
    description: "Décroche, oriente, prend les rendez-vous dans Google Calendar.",
    preview: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=1200&q=80",
    url: "https://delmarwebstudios.vercel.app/solutions/vocal-ia",
  },
  {
    title: "Chatbot Web Multilingue",
    category: "Chatbot Web",
    description: "Bulle de chat sur votre site, répond FR / EN, bascule vers WhatsApp.",
    preview: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&q=80",
    url: "https://delmarwebstudios.vercel.app",
  },
  {
    title: "SaaS Prospection B2B",
    category: "SaaS Prospection",
    description: "Extraction de leads + séquences cold email + handoff WhatsApp.",
    preview: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
    url: "https://delmarwebstudios.vercel.app/solutions/saas-prospection",
  },
];

const VIDEOS: Video[] = [
  {
    title: "Démo : Agent WhatsApp qui vend tout seul",
    category: "Agent IA WhatsApp",
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Démo : Agent Vocal IA décroche et planifie",
    category: "Agent Vocal IA",
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Cas client : SauvonsTonExam (+62% inscrits)",
    category: "Landing Page",
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Démo : Chatbot web → WhatsApp",
    category: "Chatbot Web",
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export default function Demos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState<Category>("Tous");
  const [query, setQuery] = useState("");

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((t) => (active === "Tous" || t.category === active) &&
      (query.trim() === "" || t.title.toLowerCase().includes(query.toLowerCase()) || t.description.toLowerCase().includes(query.toLowerCase()))
    );
  }, [active, query]);

  const filteredVideos = useMemo(() => {
    return VIDEOS.filter((v) => active === "Tous" || v.category === active);
  }, [active]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onGetStarted={() => setModalOpen(true)} />

      {/* Hero */}
      <section className="pt-36 pb-16 lg:pt-40 lg:pb-20">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">Démos & inspirations</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
            Voyez les systèmes <span className="text-electric">en action.</span>
          </h1>
          <p className="mt-5 text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Une bibliothèque de templates filtrables et de vidéos de démonstration pour visualiser ce que nous pouvons construire pour vous.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un template…"
                className="w-full pl-11 pr-4 py-3 rounded-full border border-border bg-white text-sm focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/20"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  active === c
                    ? "bg-foreground text-white"
                    : "bg-secondary text-foreground/70 hover:bg-secondary/70"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Templates {active !== "Tous" && <span className="text-electric">· {active}</span>}</h2>
          {filteredTemplates.length === 0 ? (
            <p className="text-muted-foreground text-sm">Aucun template ne correspond à votre recherche.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((t, i) => (
                <motion.a
                  key={t.title}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  className="group block rounded-2xl overflow-hidden bg-white border border-border hover:border-electric/50 hover:shadow-premium transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-secondary">
                    <img src={t.preview} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t.category}</p>
                        <h3 className="mt-1 text-base font-bold text-foreground">{t.title}</h3>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-foreground/30 group-hover:text-electric transition-colors flex-shrink-0 mt-1" />
                    </div>
                    <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{t.description}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Videos */}
      <section className="pb-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <Play className="h-6 w-6 text-electric" /> Galerie vidéo
            </h2>
          </div>
          {filteredVideos.length === 0 ? (
            <p className="text-muted-foreground text-sm">Aucune vidéo pour cette catégorie.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredVideos.map((v) => (
                <div key={v.title} className="rounded-2xl overflow-hidden border border-border bg-white shadow-sm">
                  <div className="aspect-video">
                    <iframe
                      src={v.embed}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{v.category}</p>
                    <h3 className="mt-1 text-base font-bold">{v.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-28">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="rounded-3xl bg-foreground text-white p-10 md:p-14 text-center">
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Un template vous parle ? Lancez le vôtre.
            </h3>
            <p className="mt-3 text-white/70 max-w-xl mx-auto">
              On l'adapte à votre marque, à vos produits et à vos clients. Audit offert pour cadrer le projet.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="mt-7 inline-flex items-center px-6 py-3 bg-electric text-white text-sm font-semibold rounded-full hover:opacity-90 transition-all"
            >
              Réserver mon audit gratuit
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <OnboardingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
