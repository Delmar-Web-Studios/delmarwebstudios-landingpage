import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ShoppingCart, Bot, Sparkles, ArrowRight, Layout } from "lucide-react";
import logoEcole from "@/assets/logo-ecole-canadienne.png";
import logoSauvons from "@/assets/logo-sauvonstonexam.png";

const tabs = [
  {
    id: "landing",
    icon: Layout,
    label: "Landing Pages",
    title: "Landing Page Development",
    description:
      "High-converting, visually stunning landing pages that capture attention and drive action. Designed for startups, schools, and enterprises across Africa.",
    showcase: logoEcole,
    showcaseLabel: "Ecole Canadienne Internationale",
    features: ["Conversion-optimized design", "Mobile-first responsive", "SEO-ready architecture", "Custom animations"],
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    label: "E-commerce",
    title: "E-commerce Systems",
    description:
      "Full-stack e-commerce platforms with payment integration, inventory management, and analytics built for African markets.",
    showcase: logoSauvons,
    showcaseLabel: "SauvonsTonExam",
    features: ["Payment gateway integration", "Inventory management", "Analytics dashboard", "Mobile commerce"],
  },
  {
    id: "ai",
    icon: Bot,
    label: "AI Chatbots",
    title: "AI Chatbot Automation",
    description:
      "Intelligent AI sales agents deployed on WhatsApp, Instagram, and Facebook — engaging your customers 24/7 in their language.",
    showcase: null,
    showcaseLabel: null,
    features: ["WhatsApp Business API", "Instagram DM automation", "Facebook Messenger bots", "Multilingual AI agents"],
  },
];

export function ServicesSection() {
  const [activeTab, setActiveTab] = useState("landing");
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section id="services" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold tracking-[0.15em] uppercase text-electric mb-3">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything You Need to <span className="text-gradient-blue">Dominate</span> Online
          </h2>
          <p className="text-muted-foreground text-lg">
            From stunning websites to AI-powered customer engagement — we handle the tech so you can focus on growth.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                activeTab === tab.id
                  ? "bg-foreground text-background border-foreground shadow-card"
                  : "bg-background text-muted-foreground border-border hover:border-foreground/20"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-10 items-center surface-elevated rounded-2xl p-8 lg:p-12 border border-border"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <active.icon className="h-5 w-5 text-electric" />
                <h3 className="text-2xl font-bold">{active.title}</h3>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">{active.description}</p>
              <ul className="space-y-3">
                {active.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Sparkles className="h-4 w-4 text-electric flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              {active.showcase ? (
                <div className="bg-background rounded-xl p-8 shadow-card border border-border">
                  <img
                    src={active.showcase}
                    alt={active.showcaseLabel || ""}
                    className="h-28 w-auto object-contain mx-auto"
                  />
                  <p className="text-center text-sm text-muted-foreground mt-4 font-medium">{active.showcaseLabel}</p>
                </div>
              ) : (
                <div className="bg-background rounded-xl p-8 shadow-card border border-border text-center">
                  <div className="flex justify-center gap-4 mb-4">
                    <Globe className="h-10 w-10 text-electric" />
                    <Bot className="h-10 w-10 text-electric" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    WhatsApp · Instagram · Facebook
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">24/7 AI-powered engagement</p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
