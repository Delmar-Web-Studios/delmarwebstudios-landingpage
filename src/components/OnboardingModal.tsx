import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Zap, Users, ShoppingCart, Send, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

const goals = [
  { label: "Get More Leads", icon: Zap },
  { label: "Automate Support", icon: Users },
  { label: "Scale E-commerce", icon: ShoppingCart },
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00",
];

function isWeekend(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function OnboardingModal({ open, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [data, setData] = useState({
    goal: "",
    name: "",
    business: "",
    industry: "",
    website: "",
    meetTime: "",
    whatsapp: "",
    email: "",
  });

  const totalSteps = 5;
  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const meetDate = selectedDate ? selectedDate.toISOString().split("T")[0] : null;
      const { error } = await supabase.from("bookings").insert({
        goal: data.goal,
        name: data.name,
        business_name: data.business,
        industry: data.industry,
        website_url: data.website || null,
        budget: null,
        meet_date: meetDate,
        meet_time: data.meetTime || null,
        whatsapp: data.whatsapp,
        email: data.email,
      });
      if (error) throw error;

      const msg = `Hi! I'm ${data.name} from ${data.business} (${data.industry}). Goal: ${data.goal}. Website: ${data.website || "N/A"}. Meet: ${meetDate} ${data.meetTime}. Email: ${data.email}`;
      const encoded = encodeURIComponent(msg);
      window.open(`https://wa.me/${data.whatsapp.replace(/\D/g, "")}?text=${encoded}`, "_blank");
      toast.success("Booking submitted successfully!");
      onClose();
      setStep(1);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const canNext = () => {
    switch (step) {
      case 1: return !!data.goal;
      case 2: return data.name.trim() && data.business.trim() && data.industry.trim();
      case 3: return true;
      case 4: return !!selectedDate && !!data.meetTime;
      case 5: return data.whatsapp.trim() && data.email.trim();
      default: return false;
    }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all";

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
                    <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i < step ? "bg-primary w-8" : "bg-border w-4"}`} />
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
                <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
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
                              data.goal === g.label ? "border-primary bg-primary/5 text-foreground" : "border-border hover:border-primary/30"
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
                            <input type="text" placeholder={field.placeholder} value={(data as any)[field.key]} onChange={(e) => setData({ ...data, [field.key]: e.target.value })} className={inputClass} />
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
                      <input type="url" placeholder="https://yourwebsite.com (optional)" value={data.website} onChange={(e) => setData({ ...data, website: e.target.value })} className={inputClass} />
                    </div>
                  )}

                  {step === 4 && (
                    <div>
                      <h3 className="text-xl font-bold mb-2">Pick a Date & Time</h3>
                      <p className="text-sm text-muted-foreground mb-4">Choose an available slot for your Google Meet call.</p>

                      <div className="flex flex-col items-center">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => {
                            setSelectedDate(date);
                            setData({ ...data, meetTime: "" });
                          }}
                          disabled={(date) => date < new Date() || isWeekend(date)}
                          className="rounded-xl border border-border pointer-events-auto"
                        />

                        {selectedDate && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 w-full"
                          >
                            <p className="text-sm font-medium mb-2">
                              Available times for{" "}
                              <span className="text-primary">
                                {selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                              </span>
                            </p>
                            <div className="grid grid-cols-3 gap-2 max-h-[120px] overflow-y-auto">
                              {timeSlots.map((t) => (
                                <button
                                  key={t}
                                  onClick={() => setData({ ...data, meetTime: t })}
                                  className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                                    data.meetTime === t
                                      ? "border-primary bg-primary/10 text-primary"
                                      : "border-border hover:border-primary/30"
                                  }`}
                                >
                                  {data.meetTime === t && <Check className="h-3 w-3" />}
                                  {t}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
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
                          <input type="tel" placeholder="+237 6XX XXX XXX" value={data.whatsapp} onChange={(e) => setData({ ...data, whatsapp: e.target.value })} className={inputClass} />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Email Address</label>
                          <input type="email" placeholder="you@company.com" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className={inputClass} />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-border">
              <button onClick={prev} disabled={step === 1} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              {step < totalSteps ? (
                <button onClick={next} disabled={!canNext()} className="flex items-center gap-1 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl disabled:opacity-40 hover:scale-[1.02] transition-all">
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={!canNext() || submitting} className="flex items-center gap-1 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl disabled:opacity-40 hover:scale-[1.02] transition-all">
                  <Send className="h-4 w-4" /> {submitting ? "Submitting..." : "Book My Call"}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
