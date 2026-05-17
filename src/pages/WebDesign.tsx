import { useState } from "react";
import { motion } from "framer-motion";
import { Layout, Sparkles, Zap, Search, Smartphone } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OnboardingModal } from "@/components/OnboardingModal";
import { BlueBubbles } from "@/components/BlueBubbles";
import logoEcole from "@/assets/logo-ecole-canadienne.png";
import screenshotEcole from "@/assets/screenshot-ecole.png";

const features = [
  { icon: Sparkles, title: "Image de marque premium", desc: "Chaque pixel est conçu pour renforcer votre autorité et la confiance de vos visiteurs." },
  { icon: Search, title: "Architecture optimisée SEO", desc: "Pensé pour se classer sur Google dès le premier jour, avec un HTML sémantique et un chargement rapide." },
  { icon: Zap, title: "Performance ultra-rapide", desc: "Optimisé pour les Core Web Vitals — votre site se charge en moins de 2 secondes." },
  { icon: Smartphone, title: "Responsive Mobile-First", desc: "Une expérience parfaite sur tous les appareils, du desktop au smartphone." },
];

export default function WebDesign() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background relative">
      <BlueBubbles />
      <Navbar onGetStarted={() => setModalOpen(true)} />

      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-2 mb-4">
                <Layout className="h-5 w-5 text-electric" />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-electric">Site Vitrine</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-4">
                Des <span className="text-gradient-blue">Landing Pages</span> haute performance pour les institutions modernes
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Renforcez votre autorité de marque avec un design web rapide, responsive et haut de gamme.
              </p>
              <button onClick={() => setModalOpen(true)} className="px-8 py-4 bg-foreground text-background text-base font-semibold rounded-xl btn-glow hover:scale-[1.03] transition-all duration-200">
                Réserver un diagnostic stratégique →
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden border border-[hsl(var(--border))] shadow-premium">
                  <img src={screenshotEcole} alt="Site Ecole Canadienne Internationale" className="w-full h-auto" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-background rounded-xl p-3 border border-[hsl(var(--border))] shadow-card flex items-center gap-2">
                  <img src={logoEcole} alt="Ecole Canadienne" className="h-8 w-8 rounded-lg object-contain" />
                  <span className="text-xs font-semibold">Ecole Canadienne Internationale</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Ce qui rend notre <span className="text-gradient-blue">design web</span> différent
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-background p-6 rounded-2xl border border-[hsl(var(--border))] hover:shadow-premium transition-shadow"
              >
                <f.icon className="h-8 w-8 text-electric mb-4" />
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <OnboardingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
