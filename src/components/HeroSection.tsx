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
          Conçu pour la nouvelle génération de géants africains
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6"
        >
          Votre <span className="text-gradient-blue">Vision</span> mérite une présence digitale aussi{" "}
          <span className="text-gradient-blue">audacieuse</span> que votre ambition
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Arrêtez de perdre des clients à cause de systèmes dépassés. Nous créons des sites premium
          et des agents IA qui transforment votre travail en moteur de revenus 24/7.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center gap-3 mb-16"
        >
          <button
            onClick={onCta}
            className="px-8 py-4 bg-foreground text-background text-base font-semibold rounded-xl btn-glow hover:scale-[1.03] transition-all duration-200"
          >
            Revendiquez votre autorité →
          </button>
          <span className="text-sm text-muted-foreground">Aucune carte bancaire requise</span>
        </motion.div>
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
