import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function PromiseSection() {
  return (
    <section className="py-28 lg:py-40 bg-white">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-foreground">
          Maîtrisez votre croissance.
        </h2>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <p className="text-2xl md:text-3xl font-medium leading-[1.5] text-foreground">
          « Notre agent IA nous a libéré <span className="text-electric font-bold">15h par semaine</span>. »
        </p>
        <p className="text-sm text-muted-foreground mt-6">Enguene Tryphene · SauvonsTonExam</p>
      </div>
    </section>
  );
}

export function UrgencySection({ onCta }: { onCta: () => void }) {
  return (
    <section className="py-28 lg:py-36 bg-white">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-foreground mb-12">
          Chaque jour compte.
        </h2>
        <button
          onClick={onCta}
          className="px-9 py-4 bg-foreground text-background text-base font-semibold rounded-full hover:scale-[1.03] transition-all shadow-premium"
        >
          Réserver mon diagnostic
        </button>
      </div>
    </section>
  );
}

const faqs = [
  { q: "Je n'y connais rien en tech, est-ce un problème ?", a: "Non. Solutions clés en main, on gère toute la complexité." },
  { q: "Combien de temps pour être opérationnel ?", a: "Entre 3 jours et 2 semaines après le diagnostic." },
  { q: "Les agents IA parlent-ils naturellement ?", a: "Oui — ton de votre marque, contexte compris, fluide et humain." },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-28 lg:py-36 bg-white">
      <div className="container mx-auto px-6 max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-foreground text-center mb-14">
          Questions.
        </h2>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <div key={i} className="border-b border-border/60">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left font-medium text-base md:text-lg text-foreground"
              >
                <span>{f.q}</span>
                <ChevronDown className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <p className="pb-6 text-sm text-muted-foreground leading-relaxed">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
