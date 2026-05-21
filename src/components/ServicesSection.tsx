import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { title: "Design Web", tag: "Sites premium", href: "/web-design" },
  { title: "E-commerce", tag: "Boutiques qui convertissent", href: "/ecommerce" },
  { title: "Automatisation IA", tag: "Agents 24/7", href: "/ai-automation" },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-28 lg:py-36 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-foreground text-center mb-16">
          Nos services.
        </h2>
        <div className="grid md:grid-cols-3 gap-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link
                to={s.href}
                className="group block rounded-3xl p-10 bg-white hover:bg-secondary/40 transition-colors h-full"
              >
                <div className="flex items-start justify-between mb-12">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-electric font-semibold">{s.tag}</span>
                  <ArrowUpRight className="h-5 w-5 text-foreground/40 group-hover:text-electric group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{s.title}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
