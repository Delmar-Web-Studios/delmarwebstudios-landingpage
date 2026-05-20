import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Quote, Clock, TrendingDown, AlertTriangle } from "lucide-react";

/* ──────────────────────────────── PROMESSE ──────────────────────────────── */
export function PromiseSection() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-electric mb-5">
          La Promesse
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-8 text-foreground">
          Ne subissez plus votre croissance.{" "}
          <span className="text-electric">Maîtrisez-la.</span>
        </h2>
        <p className="text-lg text-muted-foreground leading-[1.8] max-w-2xl mx-auto">
          Vous n'avez pas juste besoin d'un site web ou d'un outil de plus. Vous avez besoin de{" "}
          <strong className="text-foreground font-semibold">temps</strong>, de{" "}
          <strong className="text-foreground font-semibold">sérénité</strong> et d'une image qui
          reflète votre véritable valeur. Nous concevons des solutions sur-mesure pour que votre
          entreprise tourne à plein régime, sans que vous n'ayez à lever le petit doigt.
        </p>
      </div>
    </section>
  );
}

/* ────────────────────────────── TÉMOIGNAGES ────────────────────────────── */
export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl border border-border/70 p-10 md:p-14 text-center"
        >
          <Quote className="h-10 w-10 text-electric/30 mx-auto mb-6" />
          <p className="text-xl md:text-2xl font-medium leading-[1.6] mb-10 text-foreground">
            « L'intégration de notre agent IA sur nos canaux de messagerie a libéré notre équipe
            de plus de{" "}
            <strong className="font-bold">15 heures de gestion répétitive par semaine</strong>.
            Les clients reçoivent une réponse instantanée, même à 23h. »
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-12 w-12 rounded-full bg-electric/10 flex items-center justify-center text-electric font-bold text-sm">
              ET
            </div>
            <div className="text-left">
              <p className="font-bold text-sm">Enguene Tryphene</p>
              <p className="text-xs text-muted-foreground">Fondateur, SauvonsTonExam</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────── COÛT DE L'INACTION ────────────────────────── */
export function UrgencySection({ onCta }: { onCta: () => void }) {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-electric mb-5">
            Le coût de l'inaction
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6 text-foreground">
            Combien vous coûte{" "}
            <span className="text-electric">chaque jour</span> votre système actuel ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-[1.75]">
            Chaque minute passée à répondre manuellement aux mêmes messages, chaque prospect qui
            quitte un site lent pour un concurrent — c'est de l'argent et de l'énergie qui s'évaporent.
          </p>
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-16 max-w-2xl mx-auto">
          {[
            { stat: "-40%", label: "Temps perdu" },
            { stat: "-25%", label: "Leads évaporés" },
            { stat: "-15%", label: "Image de marque" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-5xl font-extrabold text-electric mb-2">{s.stat}</div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {[
            { icon: Clock, title: "Heures perdues", desc: "Des dizaines d'heures par semaine à gérer manuellement ce qu'une IA fait en quelques secondes." },
            { icon: TrendingDown, title: "Clients qui fuient", desc: "Un site lent ou un message sans réponse, et votre prospect est déjà chez le concurrent." },
            { icon: AlertTriangle, title: "Retard concurrentiel", desc: "Pendant que vous hésitez, les leaders de votre secteur automatisent leur croissance." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white p-8 rounded-2xl border border-border/70"
            >
              <item.icon className="h-7 w-7 text-electric mb-4" />
              <h3 className="font-bold text-base mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-[1.7]">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-base text-muted-foreground mb-6 max-w-xl mx-auto leading-[1.75]">
            Ne laissez pas un retard technologique saboter des années d'efforts.{" "}
            <strong className="text-foreground">Le moment de passer à l'échelle, c'est maintenant.</strong>
          </p>
          <button
            onClick={onCta}
            className="px-8 py-4 bg-foreground text-background text-base font-semibold rounded-full hover:scale-[1.03] transition-all duration-200 shadow-premium"
          >
            Réserver mon diagnostic offert
          </button>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────── FAQ ────────────────────────────────── */
const faqs = [
  {
    q: "Je n'y connais rien en technologie, est-ce un problème ?",
    a: "Absolument pas. Nous concevons des solutions clés en main et totalement autonomes. On s'occupe de toute la complexité pour que vous n'ayez qu'à récolter les résultats.",
  },
  {
    q: "En combien de temps mon agent IA ou mon site sera-t-il opérationnel ?",
    a: "Chaque solution étant faite sur-mesure pour coller parfaitement à votre business, les délais varient entre 3 jours et 2 semaines après notre diagnostic initial.",
  },
  {
    q: "Est-ce que les agents IA sur WhatsApp parlent naturellement ?",
    a: "Oui. Nos agents IA sont configurés pour comprendre le contexte, répondre avec le ton exact de votre entreprise et interagir de manière aussi fluide et humaine qu'un conseiller chevronné.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-electric mb-5">
            FAQ
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-foreground">
            Des réponses à <span className="text-electric">vos questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border/70 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-sm md:text-base hover:bg-secondary/40 transition-colors"
              >
                <span>{f.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-6 text-sm text-muted-foreground leading-[1.75]">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
