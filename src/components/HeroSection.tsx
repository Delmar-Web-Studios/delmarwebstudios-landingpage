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
          Built for the Next Generation of African Giants
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6"
        >
          Your <span className="text-gradient-blue">Vision</span> Deserves a Digital Presence as{" "}
          <span className="text-gradient-blue">Bold</span> as Your Ambition
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Stop losing customers to outdated systems. We build premium websites and AI-powered sales
          agents that turn your hard work into a 24/7 revenue engine.
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
            Claim Your Authority →
          </button>
          <span className="text-sm text-muted-foreground">No credit card required</span>
        </motion.div>
      </div>

      {/* Showcase Image - seamless, no border, no zoom */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full px-4 lg:px-8"
      >
        <img
          src={heroShowcase}
          alt="Premium website designs by Delmar Web Studios"
          className="w-full h-auto block rounded-2xl"
          style={{ imageRendering: "auto" }}
        />
      </motion.div>
    </section>
  );
}
