import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, MessageSquare, Zap, Globe, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OnboardingModal } from "@/components/OnboardingModal";
import { BlueBubbles } from "@/components/BlueBubbles";
import screenshotChatbot from "@/assets/screenshot-chatbot.png";

const features = [
  { icon: MessageSquare, title: "WhatsApp Business API", desc: "Automate conversations on the #1 messaging platform in Africa." },
  { icon: Globe, title: "Multi-Platform Deployment", desc: "One AI agent across WhatsApp, Instagram DM, and Facebook Messenger." },
  { icon: Zap, title: "Lead Qualification", desc: "Automatically qualify and route leads to your sales team in real-time." },
  { icon: Users, title: "Multilingual AI Agents", desc: "Respond in French, English, and local languages — 24/7." },
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
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-electric">AI Automation</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-4">
                Automate Your <span className="text-gradient-blue">Engagement</span> With <span className="text-gradient-blue">Intelligent</span> AI Agents
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Deploy smart chatbots on WhatsApp, Facebook, and Instagram to handle leads 24/7.
              </p>
              <button onClick={() => setModalOpen(true)} className="px-8 py-4 bg-foreground text-background text-base font-semibold rounded-xl btn-glow hover:scale-[1.03] transition-all duration-200">
                Automate Now →
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="rounded-2xl overflow-hidden border border-[hsl(var(--border))] shadow-premium">
                <img src={screenshotChatbot} alt="AI Chatbot Interface" className="w-full h-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Why Our <span className="text-gradient-blue">AI Agents</span> Outperform
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
