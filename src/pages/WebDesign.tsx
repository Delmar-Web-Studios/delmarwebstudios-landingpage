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
  { icon: Sparkles, title: "Premium Branding", desc: "Every pixel crafted to elevate your authority and trust with visitors." },
  { icon: Search, title: "SEO-Ready Architecture", desc: "Built to rank on Google from day one with semantic HTML and fast load times." },
  { icon: Zap, title: "Lightning-Fast Performance", desc: "Optimized for Core Web Vitals — your site loads in under 2 seconds." },
  { icon: Smartphone, title: "Mobile-First Responsive", desc: "Flawless experience on every device, from desktop to smartphone." },
];

export default function WebDesign() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background relative">
      <BlueBubbles />
      <Navbar onGetStarted={() => setModalOpen(true)} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-2 mb-4">
                <Layout className="h-5 w-5 text-electric" />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-electric">Website Vitrine</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-4">
                High-Performance <span className="text-gradient-blue">Landing Pages</span> for Modern Institutions
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Elevate your brand authority with fast, responsive, and elite-level web design.
              </p>
              <button onClick={() => setModalOpen(true)} className="px-8 py-4 bg-foreground text-background text-base font-semibold rounded-xl btn-glow hover:scale-[1.03] transition-all duration-200">
                Start Your Project →
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden border border-[hsl(var(--border))] shadow-premium">
                  <img src={screenshotEcole} alt="Ecole Canadienne Internationale website" className="w-full h-auto" />
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

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            What Makes Our <span className="text-gradient-blue">Web Design</span> Different
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
