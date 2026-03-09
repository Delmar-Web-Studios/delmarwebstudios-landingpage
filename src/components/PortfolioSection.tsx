import { motion } from "framer-motion";
import logoEcole from "@/assets/logo-ecole-canadienne.png";
import logoMaison from "@/assets/logo-maison-blanche.png";
import logoSauvons from "@/assets/logo-sauvonstonexam.png";

const clients = [
  { name: "Ecole Canadienne Internationale", logo: logoEcole },
  { name: "La Maison Blanche Afanayo", logo: logoMaison },
  { name: "SauvonsTonExam", logo: logoSauvons },
];

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 lg:py-28 surface-elevated">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold tracking-[0.15em] uppercase text-electric mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Trusted by <span className="text-gradient-blue">Ambitious</span> Brands
          </h2>
          <p className="text-muted-foreground text-lg">
            We've helped businesses across Africa establish their digital authority.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-background rounded-xl p-6 shadow-card border border-border flex flex-col items-center justify-center hover:shadow-premium transition-shadow duration-300"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-20 w-auto object-contain mb-4"
                loading="lazy"
              />
              <p className="text-sm font-medium text-center text-muted-foreground">{client.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
