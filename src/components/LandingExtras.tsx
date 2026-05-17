import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Quote, Clock, TrendingDown, AlertTriangle } from "lucide-react";

/* ──────────────────────────────── PROMESSE ──────────────────────────────── */
export function PromiseSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
        <p className="text-sm font-semibold tracking-[0.15em] uppercase text-electric mb-3">
          La Promesse
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          Ne subissez plus votre croissance. <span className="text-gradient-blue">Maîtrisez-la.</span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Vous n'avez pas juste besoin d'un site web ou d'un outil de plus. Vous avez besoin de
          <strong className="text-foreground font-semibold"> temps</strong>, de
          <strong className="text-foreground font-semibold"> sérénité</strong> et d'une image qui
          reflète votre véritable valeur. Nous concevons des solutions sur-mesure pour que votre
          entreprise tourne à plein régime, sans que vous n'ayez à lever le petit doigt. Vous
          reprenez le contrôle de votre temps ; nous gérons le reste.
        </p>
      </div>
    </section>
  );
}

/* ────────────────────────────── TÉMOIGNAGES ────────────────────────────── */
export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-[0.15em] uppercase text-electric mb-3">
            Témoignages
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ce qu'ils <span className="text-gradient-blue">disent</span> de nous
          </h2>
          <p className="text-muted-foreground text-lg">
            La plus belle récompense reste la liberté et la croissance de ceux qui nous font confiance.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-background rounded-2xl border border-[hsl(var(--border))] p-8 md:p-10 shadow-card"
        >
          <Quote className="h-8 w-8 text-electric mb-4" />
          <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
            « L'intégration de notre agent IA sur nos canaux de messagerie a libéré notre équipe
            de plus de <strong>15 heures de gestion répétitive par semaine</strong>. Les clients
            reçoivent une réponse instantanée, même à 23h. Un investissement rentabilisé en un
            temps record. »
          </p>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-electric font-bold text-sm">
              ET
            </div>
            <div>
              <p className="font-semibold text-sm">Enguene Tryphene</p>
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
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold tracking-[0.15em] uppercase text-electric mb-3">
            Le coût de l'inaction
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Combien vous coûte <span className="text-gradient-blue">chaque jour</span> votre système actuel ?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Chaque minute passée à répondre manuellement aux mêmes messages, chaque prospect qui
            quitte un site lent pour un concurrent — c'est de l'argent et de l'énergie qui s'évaporent.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
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
              className="bg-background p-6 rounded-2xl border border-[hsl(var(--border))]"
            >
              <item.icon className="h-7 w-7 text-electric mb-3" />
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-base text-muted-foreground mb-5">
            Ne laissez pas un retard technologique saboter des années d'efforts. <strong className="text-foreground">Le moment de passer à l'échelle, c'est maintenant.</strong>
          </p>
          <button
            onClick={onCta}
            className="px-8 py-4 bg-foreground text-background text-base font-semibold rounded-xl btn-glow hover:scale-[1.03] transition-all duration-200"
          >
            Réserver mon diagnostic offert →
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
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-[0.15em] uppercase text-electric mb-3">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Des réponses à <span className="text-gradient-blue">vos questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="bg-background rounded-2xl border border-[hsl(var(--border))] overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm md:text-base hover:bg-primary/5 transition-colors"
              >
                <span>{f.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
