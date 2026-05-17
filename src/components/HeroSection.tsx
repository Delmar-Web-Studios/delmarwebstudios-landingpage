import { motion } from "framer-motion";
import heroShowcase from "@/assets/hero-showcase.png";

export function HeroSection({ onCta }: { onCta: () => void }) {
  return (
    <section className="relative pt-32 pb-0 lg:pt-44 lg:pb-0 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-electric mb-6 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10"
        >
          Delmar Web Studios — Premium African Digital Agency
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6"
        >
          Conçu pour la nouvelle génération de <span className="text-gradient-blue">leaders économiques</span> africains.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Votre vision mérite une présence digitale aussi <strong className="text-foreground font-semibold">audacieuse</strong> que votre ambition. Arrêtez de perdre du temps et des clients à cause de processus manuels. Nous créons des sites web premium sur-mesure et des agents IA intelligents qui transforment votre business en un moteur de revenus autonome. Gagnez la liberté que vous méritez pendant que votre technologie travaille pour vous, 24h/24 et 7j/7.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4"
        >
          <button
            onClick={onCta}
            className="px-7 py-3.5 bg-foreground text-background text-base font-semibold rounded-xl btn-glow hover:scale-[1.03] transition-all duration-200"
          >
            Propulser ma présence digitale →
          </button>
          <button
            onClick={onCta}
            className="px-7 py-3.5 bg-background text-foreground text-base font-semibold rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
          >
            Réserver un diagnostic stratégique (Offert)
          </button>
        </motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="block text-sm text-muted-foreground mb-16"
        >
          Aucune carte bancaire requise
        </motion.span>
      </div>

      {/* Showcase Image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full px-4 lg:px-8"
      >
        <img
          src={heroShowcase}
          alt="Designs de sites premium par Delmar Web Studios"
          className="w-full h-auto block rounded-2xl"
          style={{ imageRendering: "auto" }}
        />
      </motion.div>
    </section>
  );
}
