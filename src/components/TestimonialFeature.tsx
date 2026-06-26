import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import logoSauvons from "@/assets/logo-sauvonstonexam.png.asset.json";

export function TestimonialFeature() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl border border-border bg-gradient-to-br from-white to-electric/5 p-10 lg:p-14"
        >
          <Quote className="absolute top-6 right-8 h-12 w-12 text-electric/15" />

          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-electric text-electric" />
            ))}
          </div>

          <p className="text-xl md:text-3xl font-medium leading-[1.4] text-foreground">
            « Nos systèmes dans notre application et notre équipe ont été entièrement conçus par
            <span className="text-electric font-semibold"> Delmar Web Studios</span>.
            Nous avons gagné une énorme quantité de temps et nous pouvons enfin nous concentrer sur l'essentiel. »
          </p>

          <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
            Grâce au système de réservation directe via WhatsApp en un clic, ils ont éliminé les intermédiaires
            gourmands en commissions et automatisé la gestion de leur application éducative.
          </p>

          <div className="flex items-center gap-4 mt-10 pt-8 border-t border-border">
            <img src={logoSauvons.url} alt="SauvonsTonExam" className="h-14 w-14 object-contain" />
            <div>
              <p className="font-bold text-foreground">Enguene Tryphene</p>
              <p className="text-sm text-muted-foreground">Fondateur — SauvonsTonExam</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
