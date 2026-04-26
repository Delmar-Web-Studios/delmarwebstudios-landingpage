import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, MessageSquare, Zap, Globe, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OnboardingModal } from "@/components/OnboardingModal";
import { BlueBubbles } from "@/components/BlueBubbles";
import screenshotChatbot from "@/assets/screenshot-chatbot.png";

const features = [
  { icon: MessageSquare, title: "API WhatsApp Business", desc: "Automatisez les conversations sur la première plateforme de messagerie en Afrique." },
  { icon: Globe, title: "Déploiement multi-plateformes", desc: "Un seul agent IA sur WhatsApp, Instagram DM et Facebook Messenger." },
  { icon: Zap, title: "Qualification des leads", desc: "Qualifiez et redirigez automatiquement vos prospects vers votre équipe commerciale en temps réel." },
  { icon: Users, title: "Agents IA multilingues", desc: "Réponses en français, anglais et langues locales — 24/7." },
];

export default function AiAutomation() {
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
                <Bot className="h-5 w-5 text-electric" />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-electric">Automatisation IA</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-4">
                Automatisez vos <span className="text-gradient-blue">échanges</span> avec des agents IA <span className="text-gradient-blue">intelligents</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Déployez des chatbots intelligents sur WhatsApp, Facebook et Instagram pour gérer vos leads 24/7.
              </p>
              <button onClick={() => setModalOpen(true)} className="px-8 py-4 bg-foreground text-background text-base font-semibold rounded-xl btn-glow hover:scale-[1.03] transition-all duration-200">
                Automatiser maintenant →
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="rounded-2xl overflow-hidden border border-[hsl(var(--border))] shadow-premium">
                <img src={screenshotChatbot} alt="Interface chatbot IA" className="w-full h-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Pourquoi nos <span className="text-gradient-blue">agents IA</span> font la différence
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
