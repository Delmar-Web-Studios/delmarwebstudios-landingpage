import { motion } from "framer-motion";

export function HeroSection({ onCta }: { onCta: () => void }) {
  return (
    <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-32 bg-white">
      <div className="container mx-auto px-6 lg:px-8 text-center max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight text-foreground"
        >
          Le digital qui <span className="text-electric">travaille</span> pour vous.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14"
        >
          <button
            onClick={onCta}
            className="px-9 py-4 bg-foreground text-background text-base font-semibold rounded-full hover:scale-[1.03] transition-all shadow-premium"
          >
            Commencer
          </button>
        </motion.div>
      </div>
    </section>
  );
}
