import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroCharacter from "@/assets/hero-character.png.asset.json";

export function HeroSection({ onCta }: { onCta: () => void }) {
  return (
    <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-24 overflow-hidden bg-white">
      {/* Soft blue gradient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_30%,hsl(var(--electric-blue)/0.08),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-6 items-center relative">
        {/* Left: copy */}
        <div className="lg:col-span-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric/10 text-electric text-xs font-semibold mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
            Agence d'automatisation · Yaoundé
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-[2.6rem] sm:text-5xl lg:text-[4.2rem] font-extrabold leading-[1.05] tracking-tight text-foreground"
          >
            Arrêtez de payer pour des sites qui <span className="text-electric">dorment</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-base lg:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Nous remplaçons les abonnements d'agences hors de prix par un système qui
            <span className="text-foreground font-semibold"> encaisse, répond et prend vos rendez-vous tout seul</span> —
            pour vous libérer du surmenage.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-9 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
          >
            <button
              onClick={onCta}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-electric text-white text-sm font-semibold rounded-full hover:opacity-90 hover:scale-[1.02] transition-all shadow-[0_12px_30px_-10px_hsl(var(--electric-blue)/0.6)]"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-foreground text-sm font-semibold rounded-full border border-foreground/15 hover:border-foreground/40 transition-all"
            >
              Voir nos réussites
            </Link>
          </motion.div>
        </div>

        {/* Right: 3D character */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-6 relative flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--electric-blue)/0.18),transparent_60%)] blur-2xl" />
          <img
            src={heroCharacter.url}
            alt="Assistant IA Delmar Web Studios — WhatsApp, calendrier, croissance"
            className="relative w-full max-w-[560px] h-auto object-contain animate-[float_6s_ease-in-out_infinite]"
          />
        </motion.div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </section>
  );
}
