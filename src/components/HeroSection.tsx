import { motion } from "framer-motion";
import delmarLogo from "@/assets/delmar-logo.png";
import heroShowcase from "@/assets/hero-showcase.png";

export function HeroSection({ onCta }: { onCta: () => void }) {
  return (
    <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-28 overflow-hidden bg-white">
      <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
        {/* Logo mark — Wilgo-style hero mascot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10"
        >
          <img
            src={delmarLogo}
            alt="Delmar Web Studios"
            className="h-28 w-28 md:h-36 md:w-36 object-contain"
          />
        </motion.div>

        {/* Headline — bold, dense, black */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-foreground mb-6"
        >
          Conçu pour la nouvelle génération de{" "}
          <span className="text-electric">leaders économiques</span> africains.
        </motion.h1>

        {/* Subheadline — calm, generous line-height */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-[1.75]"
        >
          Votre vision mérite une présence digitale aussi{" "}
          <strong className="text-foreground font-semibold">audacieuse</strong> que votre ambition.
          Nous créons des sites web premium sur-mesure et des agents IA intelligents qui
          transforment votre business en un moteur de revenus autonome — 24h/24, 7j/7.
        </motion.p>

        {/* Single primary CTA — pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <button
            onClick={onCta}
            className="px-8 py-4 bg-foreground text-background text-base font-semibold rounded-full hover:scale-[1.03] transition-all duration-200 shadow-premium"
          >
            Propulser ma présence digitale
          </button>
          <button
            onClick={onCta}
            className="text-sm font-medium text-foreground/70 hover:text-foreground underline underline-offset-4 decoration-border"
          >
            Réserver un diagnostic stratégique (offert)
          </button>
          <span className="text-xs text-muted-foreground mt-1">
            Aucune carte bancaire requise
          </span>
        </motion.div>
      </div>

      {/* Showcase Image — padded, soft */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="container mx-auto max-w-5xl px-4 lg:px-8 mt-20"
      >
        <img
          src={heroShowcase}
          alt="Designs de sites premium par Delmar Web Studios"
          className="w-full h-auto block rounded-2xl border border-border/60"
        />
      </motion.div>
    </section>
  );
}
