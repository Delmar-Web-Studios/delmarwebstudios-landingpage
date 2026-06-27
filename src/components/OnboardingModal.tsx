import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Send, Building2, GraduationCap, Briefcase, Stethoscope, Hotel, Eye, MessageCircleWarning, Wallet } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

const sectors = [
  { label: "Hôtellerie", icon: Hotel },
  { label: "Éducation", icon: GraduationCap },
  { label: "Services", icon: Briefcase },
  { label: "Médical", icon: Stethoscope },
  { label: "Autre", icon: Building2 },
];

const pains = [
  { label: "Manque de visibilité", icon: Eye },
  { label: "Temps perdu sur WhatsApp", icon: MessageCircleWarning },
  { label: "Agences actuelles trop chères", icon: Wallet },
];

export function OnboardingModal({ open, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({
    name: "",
    project: "",
    whatsapp: "",
    sector: "",
    pain: "",
    goal: "",
    block: "",
  });

  const totalSteps = 6;
  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await supabase.from("bookings").insert({
        goal: data.pain,
        name: data.name,
        business_name: data.project,
        industry: data.sector,
        website_url: null,
        budget: data.goal,
        meet_date: null,
        meet_time: null,
        whatsapp: data.whatsapp,
        email: data.block,
      });
      const msg = `Bonjour Delmar Web Studios, je suis ${data.name} (projet : ${data.project}).%0ASecteur : ${data.sector}.%0ADéfi : ${data.pain}.%0AObjectif : ${data.goal}.%0AVerrou : ${data.block}.`;
      window.open(`https://wa.me/237655671935?text=${msg}`, "_blank");
      toast.success("Audit gratuit envoyé ! Nous vous recontactons sur WhatsApp.");
      onClose();
      setStep(1);
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  const canNext = () => {
    switch (step) {
      case 1: return data.name.trim() && data.project.trim();
      case 2: return data.whatsapp.trim().length >= 8;
      case 3: return !!data.sector;
      case 4: return !!data.pain;
      case 5: return data.goal.trim().length > 2;
      case 6: return data.block.trim().length > 2;
      default: return false;
    }
  };

  const inputClass = "w-full px-5 py-3.5 rounded-2xl border border-border bg-white text-base focus:outline-none focus:border-electric transition-colors";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-premium w-full max-w-xl overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 shrink-0">
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-electric">Audit gratuit · Étape {step}/{totalSteps}</p>
                <div className="flex gap-1.5 mt-3">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < step ? "bg-electric" : "bg-border"}`} />
                  ))}
                </div>
              </div>
              <button onClick={onClose} className="ml-4 p-1.5 hover:bg-secondary rounded-lg transition-colors">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-8 overflow-y-auto flex-1 min-h-0">
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
                  {step === 1 && (
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">Comment vous appelez-vous et quel est le nom de votre projet ?</h3>
                      <div className="mt-8 space-y-4">
                        <input placeholder="Votre nom complet" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className={inputClass} />
                        <input placeholder="Nom de votre projet ou entreprise" value={data.project} onChange={(e) => setData({ ...data, project: e.target.value })} className={inputClass} />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">Sur quel numéro WhatsApp pouvons-nous vous envoyer l'audit ?</h3>
                      <p className="mt-3 text-sm text-muted-foreground">Nous vous envoyons votre diagnostic personnalisé en moins de 24h.</p>
                      <input type="tel" placeholder="+237 6XX XXX XXX" value={data.whatsapp} onChange={(e) => setData({ ...data, whatsapp: e.target.value })} className={`${inputClass} mt-8`} />
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">Quel est votre secteur d'activité ?</h3>
                      <div className="mt-8 grid grid-cols-2 gap-3">
                        {sectors.map((s) => (
                          <button key={s.label} onClick={() => setData({ ...data, sector: s.label })}
                            className={`flex items-center gap-3 px-5 py-4 rounded-2xl border text-left text-sm font-semibold transition-all ${
                              data.sector === s.label ? "border-electric bg-electric/5 text-foreground" : "border-border hover:border-electric/40"
                            }`}>
                            <s.icon className={`h-5 w-5 ${data.sector === s.label ? "text-electric" : "text-muted-foreground"}`} />
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">Quel est votre plus grand défi business actuel ?</h3>
                      <div className="mt-8 space-y-3">
                        {pains.map((p) => (
                          <button key={p.label} onClick={() => setData({ ...data, pain: p.label })}
                            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl border text-left text-sm font-semibold transition-all ${
                              data.pain === p.label ? "border-electric bg-electric/5 text-foreground" : "border-border hover:border-electric/40"
                            }`}>
                            <p.icon className={`h-5 w-5 ${data.pain === p.label ? "text-electric" : "text-muted-foreground"}`} />
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">Quel objectif de chiffre d'affaires ou de heures gagnées visez-vous ce mois-ci ?</h3>
                      <textarea rows={4} placeholder="Ex : +500 000 FCFA de ventes, ou 10h gagnées par semaine sur WhatsApp." value={data.goal} onChange={(e) => setData({ ...data, goal: e.target.value })} className={`${inputClass} mt-8 resize-none`} />
                    </div>
                  )}

                  {step === 6 && (
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">Qu'est-ce qui vous bloque aujourd'hui pour passer au niveau supérieur ?</h3>
                      <textarea rows={4} placeholder="Manque de temps, budget limité, peur de la technologie, équipe absente…" value={data.block} onChange={(e) => setData({ ...data, block: e.target.value })} className={`${inputClass} mt-8 resize-none`} />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-5 shrink-0 bg-white">
              <button onClick={prev} disabled={step === 1} className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
                <ArrowLeft className="h-4 w-4" /> Retour
              </button>
              {step < totalSteps ? (
                <button onClick={next} disabled={!canNext()} className="flex items-center gap-1.5 px-6 py-3 bg-electric text-white text-sm font-semibold rounded-full disabled:opacity-40 hover:opacity-90 transition-all">
                  Continuer <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={!canNext() || submitting} className="flex items-center gap-1.5 px-6 py-3 bg-electric text-white text-sm font-semibold rounded-full disabled:opacity-40 hover:opacity-90 transition-all">
                  <Send className="h-4 w-4" /> {submitting ? "Envoi..." : "Recevoir mon audit"}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
