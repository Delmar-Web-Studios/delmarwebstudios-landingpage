import { motion } from "framer-motion";
import { ArrowUpRight, Rocket, MessageCircle, Phone, Network } from "lucide-react";
import { Link } from "react-router-dom";

export const solutions = [
  {
    slug: "landing-page",
    icon: Rocket,
    title: "Votre machine à capturer des clients en 1 clic.",
    short: "Landing Page Express",
    text: "Une page ultra-rapide conçue uniquement pour convertir vos visiteurs en acheteurs, sans blabla inutile.",
    cta: "Construire ma machine",
  },
  {
    slug: "whatsapp-ia",
    icon: MessageCircle,
    title: "Vendez et répondez 24h/24 sans toucher à votre téléphone.",
    short: "Agent IA WhatsApp & Chatbot",
    text: "Une intelligence artificielle configurée sur votre numéro pour qualifier les prospects et encaisser pendant que vous dormez.",
    cta: "Activer mon agent IA",
  },
  {
    slug: "vocal-ia",
    icon: Phone,
    title: "Un secrétariat d'élite disponible 7j/7 pour zéro appel manqué.",
    short: "Agent Vocal IA",
    text: "Un clone vocal qui décroche, répond aux questions de vos clients et planifie vos rendez-vous directement dans votre calendrier.",
    cta: "Déployer mon secrétariat",
  },
  {
    slug: "saas-prospection",
    icon: Network,
    title: "La puissance des meilleurs outils du marché, configurée pour vous.",
    short: "SaaS Prospection B2B & Chatbots",
    text: "Nous intégrons et paramétrons les solutions de nos partenaires pour extraire des prospects en masse et brancher un chatbot qui bascule sur WhatsApp.",
    cta: "Remplir mon agenda",
  },
];

export function SolutionsGrid() {
  return (
    <section id="solutions" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">Nos solutions</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-foreground">
            4 systèmes qui travaillent à votre place.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {solutions.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <Link
                to={`/solutions/${s.slug}`}
                className="group block h-full rounded-3xl p-8 lg:p-10 bg-white border border-border hover:border-electric/50 hover:shadow-premium transition-all"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="h-12 w-12 rounded-2xl bg-electric/10 text-electric flex items-center justify-center">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-foreground/30 group-hover:text-electric group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{s.short}</p>
                <h3 className="text-xl md:text-2xl font-bold text-electric leading-tight">{s.title}</h3>
                <p className="mt-4 text-sm md:text-base text-foreground/70 leading-relaxed">{s.text}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-electric transition-colors">
                  {s.cta}
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
