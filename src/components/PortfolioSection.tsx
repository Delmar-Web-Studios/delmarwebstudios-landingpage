import { motion } from "framer-motion";
import logoEcole from "@/assets/logo-ecole-canadienne.png";
import logoMaison from "@/assets/logo-maison-blanche.png";
import logoSauvons from "@/assets/logo-sauvonstonexam.png";
import logoJecam from "@/assets/logo-jecam.png";

const clients = [
  { name: "École Canadienne Inter-Nations", logo: logoEcole },
  { name: "La Maison Blanche Afanayo", logo: logoMaison },
  { name: "SauvonsTonExam", logo: logoSauvons },
  { name: "Junior Entreprise Cameroun (JECAM)", logo: logoJecam },
];

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-electric mb-5">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6 text-foreground">
            Vous êtes entre de <span className="text-electric">bonnes mains</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-[1.75]">
            Ces marques ambitieuses à travers l'Afrique nous ont confié les clés de leur présence digitale.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-8 border border-border/70 flex flex-col items-center justify-center hover:border-electric/30 hover:shadow-premium transition-all duration-300"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-20 w-auto object-contain mb-5"
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
