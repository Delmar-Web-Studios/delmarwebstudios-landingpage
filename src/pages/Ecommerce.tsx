import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, CreditCard, BarChart3, Smartphone, Package } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OnboardingModal } from "@/components/OnboardingModal";
import { BlueBubbles } from "@/components/BlueBubbles";
import logoSauvons from "@/assets/logo-sauvonstonexam.png";
import screenshotSauvons from "@/assets/screenshot-sauvonstonexam.png";

const features = [
  { icon: CreditCard, title: "Payment Integration", desc: "Accept Mobile Money, bank transfers, and international cards seamlessly." },
  { icon: Package, title: "Inventory Management", desc: "Real-time stock tracking and automated alerts to never miss a sale." },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Track revenue, conversion rates, and customer behavior in one place." },
  { icon: Smartphone, title: "Mobile Commerce", desc: "Optimized for Africa's mobile-first market with WhatsApp checkout." },
];

export default function Ecommerce() {
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
                <ShoppingCart className="h-5 w-5 text-electric" />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-electric">E-Commerce</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-4">
                Turn Your <span className="text-gradient-blue">Inventory</span> Into a <span className="text-gradient-blue">Global</span> Revenue Stream
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Scalable online stores designed for seamless shopping and high conversion rates.
              </p>
              <button onClick={() => setModalOpen(true)} className="px-8 py-4 bg-foreground text-background text-base font-semibold rounded-xl btn-glow hover:scale-[1.03] transition-all duration-200">
                Launch Your Store →
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden border border-[hsl(var(--border))] shadow-premium">
                  <img src={screenshotSauvons} alt="SauvonsTonExam platform" className="w-full h-auto" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-background rounded-xl p-3 border border-[hsl(var(--border))] shadow-card flex items-center gap-2">
                  <img src={logoSauvons} alt="SauvonsTonExam" className="h-8 w-8 rounded-lg object-contain" />
                  <span className="text-xs font-semibold">SauvonsTonExam</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Built for <span className="text-gradient-blue">African Commerce</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="bg-background p-6 rounded-2xl border border-[hsl(var(--border))] hover:shadow-premium transition-shadow">
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
