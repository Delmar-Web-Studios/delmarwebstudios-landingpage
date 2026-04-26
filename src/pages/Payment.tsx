import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { OnboardingModal } from "@/components/OnboardingModal";
import { BlueBubbles } from "@/components/BlueBubbles";
import orangeMoney from "@/assets/orange-money.png";
import mtnMomo from "@/assets/mtn-momo.png";

type PaymentMethod = "orange_money" | "mtn_momo" | "";

const formatXAF = (val: string) => {
  const num = parseInt(val.replace(/\D/g, ""), 10);
  if (isNaN(num)) return "";
  return num.toLocaleString("fr-FR");
};

export default function Payment() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    businessName: "",
    websiteUrl: "",
    whatsapp: "",
    email: "",
    paymentMethod: "" as PaymentMethod,
    amount: "",
    paymentNumber: "",
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^\+?\d{8,15}$/.test(phone.replace(/\s/g, ""));

  useEffect(() => {
    const e: Record<string, boolean> = {};
    if (form.email && !validateEmail(form.email)) e.email = true;
    if (form.whatsapp && !validatePhone(form.whatsapp)) e.whatsapp = true;
    if (form.paymentNumber && !validatePhone(form.paymentNumber)) e.paymentNumber = true;
    setErrors(e);
  }, [form.email, form.whatsapp, form.paymentNumber]);

  const canAdvance = (section: number) => {
    switch (section) {
      case 1: return form.businessName.trim().length > 0;
      case 2: return form.whatsapp.trim().length > 0 && form.email.trim().length > 0 && !errors.email && !errors.whatsapp;
      case 3: return !!form.paymentMethod;
      case 4: return form.amount.replace(/\D/g, "").length > 0 && form.paymentNumber.trim().length > 0 && !errors.paymentNumber;
      default: return false;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from("payments").insert({
        business_name: form.businessName,
        website_url: form.websiteUrl || null,
        whatsapp: form.whatsapp,
        email: form.email,
        payment_method: form.paymentMethod,
        amount_xaf: parseInt(form.amount.replace(/\D/g, ""), 10),
        payment_number: form.paymentNumber,
        status: "pending",
      });
      if (error) throw error;

      setSuccess(true);
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 }, colors: ["#0066FF", "#FFD700", "#FF6B35", "#00D4FF"] });
    } catch {
      // Error silently handled
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field?: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2 bg-background ${
      field && errors[field]
        ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
        : "border-border focus:ring-primary/20 focus:border-primary"
    }`;

  const validIcon = (field: string) =>
    form[field as keyof typeof form] && !errors[field] ? (
      <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-electric" />
    ) : null;

  if (success) {
    return (
      <div className="min-h-screen bg-background relative flex items-center justify-center">
        <BlueBubbles />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center max-w-md px-6"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-electric" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Projet financé avec <span className="text-gradient-blue">succès</span></h1>
          <p className="text-muted-foreground text-lg">Un reçu de confirmation a été envoyé sur votre WhatsApp.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <BlueBubbles />
      <Navbar onGetStarted={() => setModalOpen(true)} />

      <section className="pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Paiement <span className="text-gradient-blue">sécurisé</span></h1>
                <p className="text-muted-foreground mb-8">Finalisez votre paiement pour financer votre projet.</p>

                {/* Section 1 - Identité */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-electric mb-4">1. Identité</h3>
                  <div className="space-y-4">
                    <div className="relative">
                      <label className="text-sm font-medium mb-1.5 block">Nom de l'entreprise *</label>
                      <input
                        value={form.businessName}
                        onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                        placeholder="Nom de votre entreprise"
                        className={inputClass()}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">URL du site</label>
                      <input
                        value={form.websiteUrl}
                        onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                        placeholder="https://votresite.com (optionnel)"
                        className={inputClass()}
                      />
                    </div>
                  </div>
                  {canAdvance(1) && currentSection < 2 && (
                    <button onClick={() => setCurrentSection(2)} className="mt-4 flex items-center gap-1 text-sm font-semibold text-electric hover:underline">
                      Continuer <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Section 2 - Contact */}
                <AnimatePresence>
                  {(currentSection >= 2 || canAdvance(1)) && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-electric mb-4">2. Contact</h3>
                      <div className="space-y-4">
                        <div className="relative">
                          <label className="text-sm font-medium mb-1.5 block">Numéro WhatsApp *</label>
                          <input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="+237 6XX XXX XXX" className={inputClass("whatsapp")} />
                          {validIcon("whatsapp")}
                        </div>
                        <div className="relative">
                          <label className="text-sm font-medium mb-1.5 block">Adresse Email *</label>
                          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="vous@entreprise.com" className={inputClass("email")} />
                          {validIcon("email")}
                        </div>
                      </div>
                      {canAdvance(2) && currentSection < 3 && (
                        <button onClick={() => setCurrentSection(3)} className="mt-4 flex items-center gap-1 text-sm font-semibold text-electric hover:underline">
                          Continuer <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Section 3 - Payment Method */}
                <AnimatePresence>
                  {currentSection >= 3 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-electric mb-4">3. Mode de paiement</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { id: "orange_money" as PaymentMethod, label: "Orange Money", img: orangeMoney },
                          { id: "mtn_momo" as PaymentMethod, label: "MTN MoMo", img: mtnMomo },
                        ].map((method) => (
                          <button
                            key={method.id}
                            onClick={() => { setForm({ ...form, paymentMethod: method.id }); setCurrentSection(4); }}
                            className={`relative p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-3 ${
                              form.paymentMethod === method.id
                                ? "border-primary bg-primary/5 shadow-premium"
                                : "border-border hover:border-primary/30"
                            }`}
                          >
                            {form.paymentMethod === method.id && (
                              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                <Check className="h-3 w-3 text-primary-foreground" />
                              </div>
                            )}
                            <img src={method.img} alt={method.label} className="h-12 w-12 object-contain" />
                            <span className="text-sm font-semibold">{method.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Section 4 - Transaction */}
                <AnimatePresence>
                  {currentSection >= 4 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-electric mb-4">4. Transaction</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Montant à payer (FCFA) *</label>
                          <input
                            value={form.amount ? `${formatXAF(form.amount)} FCFA` : ""}
                            onChange={(e) => setForm({ ...form, amount: e.target.value.replace(/[^0-9]/g, "") })}
                            placeholder="ex. 500 000 FCFA"
                            className={inputClass()}
                          />
                        </div>
                        <div className="relative">
                          <label className="text-sm font-medium mb-1.5 block">Votre numéro de paiement *</label>
                          <input value={form.paymentNumber} onChange={(e) => setForm({ ...form, paymentNumber: e.target.value })} placeholder="+237 6XX XXX XXX" className={inputClass("paymentNumber")} />
                          {validIcon("paymentNumber")}
                        </div>
                      </div>

                      {/* Submit */}
                      <button
                        onClick={handleSubmit}
                        disabled={!canAdvance(4) || submitting}
                        className="w-full mt-8 px-8 py-4 bg-foreground text-background text-base font-bold rounded-xl btn-glow hover:scale-[1.02] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Vérification de la transaction...
                          </>
                        ) : (
                          "Payer maintenant"
                        )}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Invoice Preview (Desktop) */}
            <div className="hidden lg:block lg:col-span-2">
              <div className="sticky top-28">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-background rounded-2xl border border-[hsl(var(--border))] p-6 shadow-card"
                >
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-electric mb-4">Facture digitale</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Entreprise</span>
                      <span className="font-medium">{form.businessName || "—"}</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Email</span>
                      <span className="font-medium text-right max-w-[180px] truncate">{form.email || "—"}</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">WhatsApp</span>
                      <span className="font-medium">{form.whatsapp || "—"}</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Méthode</span>
                      <span className="font-medium">
                        {form.paymentMethod === "orange_money" ? "Orange Money" : form.paymentMethod === "mtn_momo" ? "MTN MoMo" : "—"}
                      </span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Montant</span>
                      <span className="text-xl font-bold text-gradient-blue">
                        {form.amount ? `${formatXAF(form.amount)} FCFA` : "—"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OnboardingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
