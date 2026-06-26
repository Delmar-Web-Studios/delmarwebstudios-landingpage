import { motion } from "framer-motion";
import { Moon, Wallet, BatteryLow } from "lucide-react";

const pains = [
  { icon: Wallet, label: "Coûts d'entretien qui étouffent", text: "Des factures d'agence mensuelles qui ne ramènent aucun client réel." },
  { icon: Moon, label: "Vos nuits sur WhatsApp", text: "Répondre manuellement à 22h aux mêmes questions, encore et encore." },
  { icon: BatteryLow, label: "Surmenage du dirigeant", text: "Vous gérez tout vous-même et vous n'avancez plus sur l'essentiel." },
];

export function PainSection() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-center text-foreground max-w-3xl mx-auto"
        >
          Pourquoi votre présence en ligne vous <span className="text-electric">épuise</span> au lieu de vous enrichir ?
        </motion.h2>
        <p className="mt-6 text-center text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
          Les agences traditionnelles vous vendent un site coûteux à entretenir, puis vous laissent
          gérer seul vos clients toute la journée sur WhatsApp. Vous payez, vous travaillez double, et personne ne vient.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mt-14">
          {pains.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="rounded-2xl border border-border bg-white p-7 hover:border-electric/40 hover:shadow-premium transition-all"
            >
              <div className="h-11 w-11 rounded-xl bg-electric/10 text-electric flex items-center justify-center mb-4">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{p.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
