import { motion } from "framer-motion";
import logoEcole from "@/assets/logo-ecole-canadienne.png";
import logoMaison from "@/assets/logo-maison-blanche.png";
import logoSauvons from "@/assets/logo-sauvonstonexam.png";
import logoJecam from "@/assets/logo-jecam.png";

const clients = [
  { name: "École Canadienne", logo: logoEcole },
  { name: "Maison Blanche", logo: logoMaison },
  { name: "SauvonsTonExam", logo: logoSauvons },
  { name: "JECAM", logo: logoJecam },
];

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-28 lg:py-36 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-foreground text-center mb-16">
          Ils nous font confiance.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {clients.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex flex-col items-center justify-center py-10"
            >
              <img src={c.logo} alt={c.name} className="h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
