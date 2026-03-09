import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Zap, Users, ShoppingCart, Calendar, Send } from "lucide-react";

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

const goals = [
  { label: "Get More Leads", icon: Zap },
  { label: "Automate Support", icon: Users },
  { label: "Scale E-commerce", icon: ShoppingCart },
];

const budgets = ["$500 – $1,500", "$1,500 – $5,000", "$5,000 – $15,000", "$15,000+"];

export function OnboardingModal({ open, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    goal: "",
    name: "",
    business: "",
    industry: "",
    website: "",
    budget: "",
    meetDate: "",
    meetTime: "",
    whatsapp: "",
    email: "",
  });

  const totalSteps = 5;

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    const msg = `Hi! I'm ${data.name} from ${data.business} (${data.industry}). Goal: ${data.goal}. Budget: ${data.budget}. Website: ${data.website || "N/A"}. Meet: ${data.meetDate} ${data.meetTime}. Email: ${data.email}`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${data.whatsapp.replace(/\D/g, "")}?text=${encoded}`, "_blank");
    onClose();
    setStep(1);
  };

  const canNext = () => {
    switch (step) {
      case 1: return !!data.goal;
      case 2: return data.name.trim() && data.business.trim() && data.industry.trim();
      case 3: return true;
      case 4: return !!data.budget;
      case 5: return data.whatsapp.trim() && data.email.trim();
      default: return false;
    }
  };

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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background rounded-2xl shadow-premium w-full max-w-lg overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Step {step} of {totalSteps}</p>
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i < step ? "bg-primary w-8" : "bg-border w-4"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-secondary rounded-lg transition-colors">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6 min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {step === 1 && (
                    <div>
                      <h3 className="text-xl font-bold mb-2">What is your main goal?</h3>
                      <p className="text-sm text-muted-foreground mb-6">Select the option that best describes your needs.</p>
                      <div className="space-y-3">
                        {goals.map((g) => (
                          <button
                            key={g.label}
                            onClick={() => setData({ ...data, goal: g.label })}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all text-sm font-medium ${
                              data.goal === g.label
                                ? "border-primary bg-primary/5 text-foreground"
                                : "border-border hover:border-primary/30"
                            }`}
                          >
                            <g.icon className={`h-5 w-5 ${data.goal === g.label ? "text-electric" : "text-muted-foreground"}`} />
                            {g.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h3 className="text-xl font-bold mb-2">Tell us about your brand</h3>
                      <p className="text-sm text-muted-foreground mb-6">We'll use this to personalize your experience.</p>
                      <div className="space-y-4">
                        {[
                          { key: "name", label: "Your Name", placeholder: "John Doe" },
                          { key: "business", label: "Business Name", placeholder: "Acme Inc." },
                          { key: "industry", label: "Industry", placeholder: "Education, Real Estate..." },
                        ].map((field) => (
                          <div key={field.key}>
                            <label className="text-sm font-medium mb-1.5 block">{field.label}</label>
                            <input
                              type="text"
                              placeholder={field.placeholder}
                              value={(data as any)[field.key]}
                              onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h3 className="text-xl font-bold mb-2">Digital Checkup</h3>
                      <p className="text-sm text-muted-foreground mb-6">Share your current website so we can assess opportunities.</p>
                      <label className="text-sm font-medium mb-1.5 block">Current Website URL</label>
                      <input
                        type="url"
                        placeholder="https://yourwebsite.com (optional)"
                        value={data.website}
                        onChange={(e) => setData({ ...data, website: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                  )}

                  {step === 4 && (
                    <div>
                      <h3 className="text-xl font-bold mb-2">Project Scope</h3>
                      <p className="text-sm text-muted-foreground mb-6">Help us understand your budget and availability.</p>
                      <label className="text-sm font-medium mb-2 block">Budget Range</label>
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {budgets.map((b) => (
                          <button
                            key={b}
                            onClick={() => setData({ ...data, budget: b })}
                            className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                              data.budget === b
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/30"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Preferred Date</label>
                          <input
                            type="date"
                            value={data.meetDate}
                            onChange={(e) => setData({ ...data, meetDate: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Preferred Time</label>
                          <input
                            type="time"
                            value={data.meetTime}
                            onChange={(e) => setData({ ...data, meetTime: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div>
                      <h3 className="text-xl font-bold mb-2">Final Step</h3>
                      <p className="text-sm text-muted-foreground mb-6">We'll send your Google Meet link via WhatsApp and email.</p>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">WhatsApp Number</label>
                          <input
                            type="tel"
                            placeholder="+237 6XX XXX XXX"
                            value={data.whatsapp}
                            onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Email Address</label>
                          <input
                            type="email"
                            placeholder="you@company.com"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-border">
              <button
                onClick={prev}
                disabled={step === 1}
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              {step < totalSteps ? (
                <button
                  onClick={next}
                  disabled={!canNext()}
                  className="flex items-center gap-1 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl disabled:opacity-40 hover:scale-[1.02] transition-all"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canNext()}
                  className="flex items-center gap-1 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl disabled:opacity-40 hover:scale-[1.02] transition-all"
                >
                  <Send className="h-4 w-4" /> Book My Call
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
