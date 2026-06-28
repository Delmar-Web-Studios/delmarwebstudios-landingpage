import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, ShieldCheck, Tag, FileText, Download, X } from "lucide-react";
import confetti from "canvas-confetti";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OnboardingModal } from "@/components/OnboardingModal";
import orangeMoney from "@/assets/orange-money.png";
import mtnMomo from "@/assets/mtn-momo.png";

type Method = "notchpay" | "orange_money" | "mtn_momo" | "";
type Tranche = 1 | 2 | 3;

const PROMO_CODES: Record<string, number> = {
  DELMAR10: 10,
  LAUNCH20: 20,
  PARTNER15: 15,
};

const SERVICES = [
  { id: "landing-page", label: "Landing Page Express", base: 250000 },
  { id: "whatsapp-ia", label: "Agent IA WhatsApp & Chatbot", base: 450000 },
  { id: "vocal-ia", label: "Agent Vocal IA", base: 650000 },
  { id: "ecommerce", label: "Boutique e-commerce", base: 550000 },
  { id: "saas-prospection", label: "SaaS Prospection B2B", base: 350000 },
];

const formatXAF = (n: number) =>
  isNaN(n) ? "—" : `${n.toLocaleString("fr-FR")} FCFA`;

export default function Payment() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [contractOpen, setContractOpen] = useState(false);

  const [form, setForm] = useState({
    businessName: "",
    serviceId: SERVICES[0].id,
    customAmount: "",
    whatsapp: "",
    email: "",
    promo: "",
    promoApplied: 0,
    tranche: 1 as Tranche,
    method: "" as Method,
    paymentNumber: "",
    acceptContract: false,
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validatePhone = (p: string) => /^\+?\d{8,15}$/.test(p.replace(/\s/g, ""));

  useEffect(() => {
    const e: Record<string, boolean> = {};
    if (form.email && !validateEmail(form.email)) e.email = true;
    if (form.whatsapp && !validatePhone(form.whatsapp)) e.whatsapp = true;
    if (form.paymentNumber && !validatePhone(form.paymentNumber)) e.paymentNumber = true;
    setErrors(e);
  }, [form.email, form.whatsapp, form.paymentNumber]);

  const baseAmount = useMemo(() => {
    const custom = parseInt(form.customAmount.replace(/\D/g, ""), 10);
    if (!isNaN(custom) && custom > 0) return custom;
    return SERVICES.find((s) => s.id === form.serviceId)?.base ?? 0;
  }, [form.serviceId, form.customAmount]);

  const discount = Math.round((baseAmount * form.promoApplied) / 100);
  const total = baseAmount - discount;
  const trancheAmount = Math.round(total / form.tranche);

  const applyPromo = () => {
    const code = form.promo.trim().toUpperCase();
    const pct = PROMO_CODES[code] ?? 0;
    setForm((f) => ({ ...f, promoApplied: pct }));
  };

  const canSubmit =
    form.businessName.trim() &&
    form.whatsapp && !errors.whatsapp &&
    form.email && !errors.email &&
    form.method &&
    form.paymentNumber && !errors.paymentNumber &&
    form.acceptContract &&
    total > 0;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const service = SERVICES.find((s) => s.id === form.serviceId)?.label ?? form.serviceId;
      await supabase.from("payments").insert({
        business_name: form.businessName,
        phone: form.whatsapp,
        email: form.email,
        method: form.method === "notchpay" ? "notchpay" : form.method,
        amount_fcfa: trancheAmount,
        notes: `Service: ${service} | Total: ${total} FCFA | Tranche ${form.tranche}/${form.tranche} | Promo: ${form.promoApplied}% | Numéro: ${form.paymentNumber}`,
        status: "pending",
      });
      setSuccess(true);
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 }, colors: ["#0066FF", "#FFD700", "#00D4FF"] });
    } catch {
      // silent
    } finally {
      setSubmitting(false);
    }
  };

  const downloadContract = () => {
    const win = window.open("", "_blank");
    if (!win) return;
    const service = SERVICES.find((s) => s.id === form.serviceId)?.label ?? "—";
    win.document.write(`
      <html><head><title>Contrat — Delmar Web Studios</title>
      <style>
        body{font-family:'Helvetica',sans-serif;padding:50px;max-width:800px;margin:auto;color:#111;line-height:1.6}
        h1{color:#0066FF;border-bottom:2px solid #0066FF;padding-bottom:10px}
        h2{margin-top:30px;font-size:16px}
        .row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee}
        .signature{margin-top:60px;display:flex;justify-content:space-between}
        .sig{border-top:1px solid #111;padding-top:6px;width:45%;font-size:12px}
        @media print{button{display:none}}
      </style></head><body>
      <h1>Contrat de prestation de services</h1>
      <p><strong>Entre :</strong> Delmar Web Studios, Yaoundé · Cameroun — <em>info@delmarwebstudios.qzz.io</em></p>
      <p><strong>Et :</strong> ${form.businessName || "[Client]"} — ${form.email || ""} — ${form.whatsapp || ""}</p>

      <h2>1. Objet</h2>
      <p>Fourniture du service : <strong>${service}</strong>.</p>

      <h2>2. Montant & modalités</h2>
      <div class="row"><span>Prix total HT</span><strong>${formatXAF(baseAmount)}</strong></div>
      <div class="row"><span>Remise (${form.promoApplied}%)</span><strong>− ${formatXAF(discount)}</strong></div>
      <div class="row"><span>Total à payer</span><strong>${formatXAF(total)}</strong></div>
      <div class="row"><span>Paiement en ${form.tranche} tranche(s)</span><strong>${formatXAF(trancheAmount)} / tranche</strong></div>

      <h2>3. Délais</h2>
      <p>Démarrage sous 48h après réception du premier versement. Livraison entre 7 et 21 jours selon le périmètre.</p>

      <h2>4. Confidentialité & propriété</h2>
      <p>Les livrables deviennent la propriété du client après paiement intégral. Les données restent confidentielles.</p>

      <h2>5. Annulation</h2>
      <p>En cas d'annulation après démarrage, le montant déjà versé reste acquis au prestataire à hauteur du travail effectué.</p>

      <div class="signature">
        <div class="sig">Le client — ${form.businessName || "—"}</div>
        <div class="sig">Delmar Web Studios</div>
      </div>

      <p style="margin-top:30px;font-size:11px;color:#777">Document généré le ${new Date().toLocaleDateString("fr-FR")}.</p>

      <button onclick="window.print()" style="margin-top:30px;padding:10px 20px;background:#0066FF;color:white;border:none;border-radius:8px;cursor:pointer">Imprimer / Enregistrer en PDF</button>
      </body></html>
    `);
    win.document.close();
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-electric/10 flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-electric" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Paiement <span className="text-electric">enregistré</span></h1>
          <p className="text-muted-foreground">Une confirmation a été envoyée sur votre WhatsApp et votre email. Notre équipe valide la transaction sous 30 minutes.</p>
        </motion.div>
      </div>
    );
  }

  const inputClass = (field?: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 bg-white ${
      field && errors[field]
        ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
        : "border-border focus:ring-electric/20 focus:border-electric"
    }`;

  return (
    <div className="min-h-screen bg-white">
      <Navbar onGetStarted={() => setModalOpen(true)} />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-electric">
              <ShieldCheck className="h-3.5 w-3.5" /> Paiement 100% sécurisé
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
              Finalisez votre <span className="text-electric">projet.</span>
            </h1>
            <p className="mt-4 text-foreground/70">
              Choisissez votre service, votre mode de paiement et le nombre de tranches. Signature du contrat incluse.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* FORM */}
            <div className="lg:col-span-3 space-y-10">
              {/* Service */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-electric mb-4">1. Votre service</h3>
                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setForm({ ...form, serviceId: s.id, customAmount: "" })}
                      className={`text-left p-4 rounded-2xl border-2 transition-all ${
                        form.serviceId === s.id
                          ? "border-electric bg-electric/5"
                          : "border-border hover:border-electric/30"
                      }`}
                    >
                      <div className="text-sm font-semibold">{s.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">À partir de {formatXAF(s.base)}</div>
                    </button>
                  ))}
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Montant personnalisé (optionnel)</label>
                  <input
                    value={form.customAmount}
                    onChange={(e) => setForm({ ...form, customAmount: e.target.value.replace(/[^0-9]/g, "") })}
                    placeholder="ex. 500000"
                    className={inputClass()}
                  />
                </div>
              </div>

              {/* Identité */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-electric mb-4">2. Vos coordonnées</h3>
                <div className="space-y-4">
                  <input value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} placeholder="Nom de votre entreprise *" className={inputClass()} />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="WhatsApp *" className={inputClass("whatsapp")} />
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email *" className={inputClass("email")} />
                  </div>
                </div>
              </div>

              {/* Promo */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-electric mb-4">3. Code promo</h3>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      value={form.promo}
                      onChange={(e) => setForm({ ...form, promo: e.target.value })}
                      placeholder="DELMAR10"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/20 uppercase"
                    />
                  </div>
                  <button onClick={applyPromo} className="px-5 py-3 rounded-xl bg-foreground text-white text-sm font-semibold hover:opacity-90">
                    Appliquer
                  </button>
                </div>
                {form.promo && (
                  <p className={`mt-2 text-xs ${form.promoApplied > 0 ? "text-electric" : "text-muted-foreground"}`}>
                    {form.promoApplied > 0 ? `✓ Réduction de ${form.promoApplied}% appliquée` : "Saisissez puis cliquez « Appliquer »"}
                  </p>
                )}
              </div>

              {/* Tranches */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-electric mb-4">4. Échéancier</h3>
                <div className="grid grid-cols-3 gap-3">
                  {([1, 2, 3] as Tranche[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setForm({ ...form, tranche: t })}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        form.tranche === t
                          ? "border-electric bg-electric/5"
                          : "border-border hover:border-electric/30"
                      }`}
                    >
                      <div className="text-sm font-bold">{t} tranche{t > 1 ? "s" : ""}</div>
                      <div className="text-xs text-muted-foreground mt-1">{formatXAF(Math.round(total / t))}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Méthode */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-electric mb-4">5. Mode de paiement</h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  <MethodButton active={form.method === "notchpay"} onClick={() => setForm({ ...form, method: "notchpay" })} label="NotchPay" sub="CB · MoMo · OM">
                    <div className="h-10 w-10 rounded-xl bg-foreground text-white flex items-center justify-center font-bold text-sm">NP</div>
                  </MethodButton>
                  <MethodButton active={form.method === "orange_money"} onClick={() => setForm({ ...form, method: "orange_money" })} label="Orange Money" sub="Direct">
                    <img src={orangeMoney} alt="Orange Money" className="h-10 w-10 object-contain" />
                  </MethodButton>
                  <MethodButton active={form.method === "mtn_momo"} onClick={() => setForm({ ...form, method: "mtn_momo" })} label="MTN MoMo" sub="Direct">
                    <img src={mtnMomo} alt="MTN MoMo" className="h-10 w-10 object-contain" />
                  </MethodButton>
                </div>
                <input
                  value={form.paymentNumber}
                  onChange={(e) => setForm({ ...form, paymentNumber: e.target.value })}
                  placeholder="Numéro utilisé pour le paiement *"
                  className={`mt-4 ${inputClass("paymentNumber")}`}
                />
              </div>

              {/* Contrat */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-electric mb-4">6. Contrat</h3>
                <div className="rounded-2xl border border-border p-5 flex items-start gap-4">
                  <FileText className="h-5 w-5 text-electric flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Contrat de prestation</p>
                    <p className="text-xs text-muted-foreground mt-1">Lisez et acceptez le contrat avant de finaliser le paiement.</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <button onClick={() => setContractOpen(true)} className="text-xs font-semibold text-electric hover:underline">Lire le contrat</button>
                      <button onClick={downloadContract} className="inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:text-electric">
                        <Download className="h-3.5 w-3.5" /> Télécharger PDF
                      </button>
                    </div>
                    <label className="mt-4 flex items-center gap-2 text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.acceptContract}
                        onChange={(e) => setForm({ ...form, acceptContract: e.target.checked })}
                        className="h-4 w-4 rounded border-border accent-electric"
                      />
                      J'ai lu et j'accepte les termes du contrat.
                    </label>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleSubmit}
                disabled={!canSubmit || submitting}
                className="w-full px-8 py-4 bg-foreground text-white text-base font-bold rounded-2xl hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> Vérification…</>
                ) : (
                  <>Payer {formatXAF(trancheAmount)}{form.tranche > 1 && " (1ère tranche)"}</>
                )}
              </button>
            </div>

            {/* INVOICE */}
            <div className="lg:col-span-2">
              <div className="sticky top-32">
                <div className="rounded-3xl border border-border p-6 bg-white shadow-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-electric mb-5">Récapitulatif</h3>
                  <Row label="Entreprise" value={form.businessName || "—"} />
                  <Row label="Service" value={SERVICES.find(s => s.id === form.serviceId)?.label ?? "—"} />
                  <Row label="Email" value={form.email || "—"} />
                  <Row label="WhatsApp" value={form.whatsapp || "—"} />
                  <div className="h-px bg-border my-4" />
                  <Row label="Sous-total" value={formatXAF(baseAmount)} />
                  {form.promoApplied > 0 && (
                    <Row label={`Promo (-${form.promoApplied}%)`} value={`− ${formatXAF(discount)}`} accent />
                  )}
                  <Row label="Total" value={formatXAF(total)} strong />
                  <div className="h-px bg-border my-4" />
                  <Row label={`Échéance (${form.tranche}×)`} value={formatXAF(trancheAmount)} />
                  <div className="mt-6 rounded-xl bg-secondary p-4 text-xs text-foreground/70 leading-relaxed">
                    <ShieldCheck className="inline h-3.5 w-3.5 text-electric mr-1" />
                    Vos informations sont chiffrées. Aucune donnée bancaire stockée sur nos serveurs.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contract modal */}
      <AnimatePresence>
        {contractOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
            onClick={() => setContractOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h3 className="font-bold">Contrat de prestation</h3>
                <button onClick={() => setContractOpen(false)} className="p-2 hover:bg-secondary rounded-full">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="overflow-y-auto px-6 py-5 text-sm text-foreground/80 leading-relaxed space-y-4">
                <p><strong>Article 1 — Objet.</strong> Delmar Web Studios fournit la prestation décrite dans le récapitulatif.</p>
                <p><strong>Article 2 — Tarif.</strong> Total : {formatXAF(total)}. Réglable en {form.tranche} tranche(s) de {formatXAF(trancheAmount)}.</p>
                <p><strong>Article 3 — Délais.</strong> Démarrage sous 48h après réception du premier versement. Livraison entre 7 et 21 jours selon le périmètre.</p>
                <p><strong>Article 4 — Confidentialité.</strong> Toutes les données client restent strictement confidentielles.</p>
                <p><strong>Article 5 — Propriété.</strong> Les livrables deviennent la propriété du client après paiement intégral.</p>
                <p><strong>Article 6 — Annulation.</strong> En cas d'annulation après démarrage, le montant déjà versé reste acquis au prestataire à hauteur du travail effectué.</p>
                <p><strong>Article 7 — Litige.</strong> Tout litige sera réglé à l'amiable, à défaut devant les juridictions compétentes de Yaoundé.</p>
              </div>
              <div className="px-6 py-4 border-t border-border flex items-center justify-between gap-3">
                <button onClick={downloadContract} className="inline-flex items-center gap-2 text-xs font-semibold text-foreground hover:text-electric">
                  <Download className="h-3.5 w-3.5" /> Télécharger PDF
                </button>
                <button
                  onClick={() => { setForm((f) => ({ ...f, acceptContract: true })); setContractOpen(false); }}
                  className="px-5 py-2.5 rounded-full bg-electric text-white text-sm font-semibold"
                >
                  J'accepte
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <OnboardingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

function MethodButton({
  active, onClick, label, sub, children,
}: { active: boolean; onClick: () => void; label: string; sub: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`relative p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
        active ? "border-electric bg-electric/5" : "border-border hover:border-electric/30"
      }`}
    >
      {active && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-electric flex items-center justify-center">
          <Check className="h-3 w-3 text-white" />
        </div>
      )}
      {children}
      <div className="text-sm font-semibold mt-1">{label}</div>
      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{sub}</div>
    </button>
  );
}

function Row({ label, value, strong, accent }: { label: string; value: string; strong?: boolean; accent?: boolean }) {
  return (
    <div className="flex justify-between items-center py-1.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={`${strong ? "text-lg font-bold text-electric" : accent ? "text-electric font-semibold" : "font-medium"} text-right max-w-[60%] truncate`}>{value}</span>
    </div>
  );
}
