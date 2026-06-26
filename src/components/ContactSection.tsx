import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MessageCircle, MapPin } from "lucide-react";
import contactCharacter from "@/assets/contact-character.png.asset.json";

const WHATSAPP = "+237655671935";
const EMAIL = "info@delmarwebstudios.qzz.io";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Bonjour Delmar Web Studios,%0A%0AJe suis ${form.name} (${form.email}).%0A%0A${form.message}`;
    window.open(`https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: character + contact info */}
          <div className="relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--electric-blue)/0.16),transparent_65%)] blur-2xl" />
            <motion.img
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              src={contactCharacter.url}
              alt="Parlez à un expert Delmar Web Studios"
              className="relative w-full max-w-[440px] mx-auto h-auto object-contain"
            />

            <div className="mt-10 space-y-4 max-w-sm mx-auto lg:mx-0">
              <a href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-3 text-foreground hover:text-electric transition-colors">
                <span className="h-10 w-10 rounded-xl bg-electric/10 text-electric flex items-center justify-center"><MessageCircle className="h-5 w-5" /></span>
                <div>
                  <p className="text-xs text-muted-foreground">WhatsApp Pro</p>
                  <p className="font-semibold text-sm">{WHATSAPP}</p>
                </div>
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-foreground hover:text-electric transition-colors">
                <span className="h-10 w-10 rounded-xl bg-electric/10 text-electric flex items-center justify-center"><Mail className="h-5 w-5" /></span>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-semibold text-sm">{EMAIL}</p>
                </div>
              </a>
              <div className="flex items-center gap-3 text-foreground">
                <span className="h-10 w-10 rounded-xl bg-electric/10 text-electric flex items-center justify-center"><MapPin className="h-5 w-5" /></span>
                <div>
                  <p className="text-xs text-muted-foreground">Localisation</p>
                  <p className="font-semibold text-sm">Yaoundé · Cameroun</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">Audit gratuit</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-foreground">
              Décrivez votre activité.<br />
              <span className="text-electric">On vous propose un plan.</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              30 minutes, sans engagement. Vous repartez avec un système concret pour gagner du temps et encaisser plus.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Votre nom"
                className="w-full px-5 py-3.5 rounded-2xl border border-border bg-white text-sm focus:outline-none focus:border-electric transition-colors"
              />
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Votre email"
                className="w-full px-5 py-3.5 rounded-2xl border border-border bg-white text-sm focus:outline-none focus:border-electric transition-colors"
              />
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Parlez-nous de votre activité et de ce qui vous épuise aujourd'hui."
                className="w-full px-5 py-3.5 rounded-2xl border border-border bg-white text-sm focus:outline-none focus:border-electric transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 bg-electric text-white text-sm font-semibold rounded-full hover:opacity-90 hover:scale-[1.01] transition-all shadow-[0_12px_30px_-10px_hsl(var(--electric-blue)/0.6)]"
              >
                Réserver mon audit gratuit
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
