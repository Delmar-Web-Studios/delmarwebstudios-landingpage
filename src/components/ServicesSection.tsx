import { motion } from "framer-motion";
import { Layout, ShoppingCart, Bot, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logoEcole from "@/assets/logo-ecole-canadienne.png";
import logoMaison from "@/assets/logo-maison-blanche.png";
import logoSauvons from "@/assets/logo-sauvonstonexam.png";
import screenshotEcole from "@/assets/screenshot-ecole.png";
import screenshotMaison from "@/assets/screenshot-maison-blanche.png";
import screenshotSauvons from "@/assets/screenshot-sauvonstonexam.png";
import screenshotChatbot from "@/assets/screenshot-chatbot.png";

const services = [
  {
    icon: Layout,
    title: "Design Web",
    headline: "Landing pages haute performance pour institutions modernes",
    description: "Renforcez votre autorité de marque avec un design web rapide, responsive et haut de gamme.",
    logo: logoEcole,
    screenshot: screenshotEcole,
    clientName: "Ecole Canadienne Internationale",
    href: "/web-design",
    cta: "En savoir plus",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    headline: "Transformez votre stock en source de revenus mondiale",
    description: "Boutiques en ligne évolutives conçues pour un parcours d'achat fluide et un fort taux de conversion.",
    logo: logoSauvons,
    screenshot: screenshotSauvons,
    clientName: "SauvonsTonExam",
    href: "/ecommerce",
    cta: "En savoir plus",
  },
  {
    icon: Bot,
    title: "Automatisation IA",
    headline: "Automatisez vos échanges avec des agents IA intelligents",
    description: "Déployez des chatbots intelligents sur WhatsApp, Facebook et Instagram pour gérer vos leads 24/7.",
    logo: null,
    screenshot: screenshotChatbot,
    clientName: "Interface IA Conversationnelle",
    href: "/ai-automation",
    cta: "En savoir plus",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold tracking-[0.15em] uppercase text-electric mb-3">
            Nos Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Tout ce qu'il vous faut pour <span className="text-gradient-blue">dominer</span> en ligne
          </h2>
          <p className="text-muted-foreground text-lg">
            Des sites web époustouflants à l'IA conversationnelle — nous gérons la tech pour que vous puissiez vous concentrer sur la croissance.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to={service.href}
                className="group block bg-background rounded-2xl border border-[hsl(var(--border))] p-6 hover:shadow-premium transition-all duration-300 h-full"
              >
                {/* Screenshot */}
                <div className="rounded-xl overflow-hidden mb-5 border border-[hsl(var(--border))]">
                  <img
                    src={service.screenshot}
                    alt={service.clientName}
                    className="w-full h-48 object-cover object-top"
                  />
                </div>

                {/* Logo + Client */}
                {service.logo && (
                  <div className="flex items-center gap-3 mb-4">
                    <img src={service.logo} alt={service.clientName} className="h-8 w-8 rounded-lg object-contain" />
                    <span className="text-xs text-muted-foreground font-medium">{service.clientName}</span>
                  </div>
                )}

                {/* Content */}
                <div className="flex items-center gap-2 mb-2">
                  <service.icon className="h-4 w-4 text-electric" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-electric">{service.title}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-electric transition-colors">{service.headline}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-electric">
                  En savoir plus <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
