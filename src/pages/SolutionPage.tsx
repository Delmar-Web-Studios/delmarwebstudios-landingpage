import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { OnboardingModal } from "@/components/OnboardingModal";

type SolutionData = {
  short: string;
  title: string;
  illustration: string;
  pain: { title: string; text: string };
  install: { title: string; bullets: string[] };
  benefits: string[];
};

const data: Record<string, SolutionData> = {
  "landing-page": {
    short: "Landing Page Express",
    title: "Une page unique qui transforme vos visiteurs en clients payants — en moins d'une semaine.",
    illustration: "/img/sol-ecom.png",
    pain: {
      title: "Le constat qui fait mal",
      text: "Un site « vitrine » classique coûte cher, met des mois à sortir, et ne ramène jamais un seul vrai client. Pendant ce temps, vos concurrents encaissent.",
    },
    install: {
      title: "Ce que nous installons pour vous",
      bullets: [
        "Une page ultra-rapide pensée pour une seule action : déclencher l'achat ou la réservation.",
        "Un bouton WhatsApp connecté directement à votre numéro pour capter les indécis en 1 clic.",
        "Le suivi des visiteurs et des conversions, branché à votre tableau de bord.",
      ],
    },
    benefits: [
      "Plus d'argent dépensé en site qui dort",
      "Des prospects qui arrivent directement sur votre téléphone",
      "Une mise en ligne en moins de 7 jours",
    ],
  },
  "whatsapp-ia": {
    short: "Agent IA WhatsApp & Chatbot Omnicanal",
    title: "Vendez, qualifiez et répondez 24h/24 sans toucher à votre téléphone.",
    pain: {
      title: "Le constat qui fait mal",
      text: "Vous passez vos soirées et vos week-ends à répondre aux mêmes questions sur WhatsApp. Un client mal géré le soir, c'est une vente perdue le lendemain.",
    },
    install: {
      title: "Ce que nous installons pour vous",
      bullets: [
        "Un agent IA qui parle au nom de votre marque sur WhatsApp, Instagram et Messenger.",
        "Une qualification automatique des prospects : il pose les bonnes questions et trie les sérieux.",
        "Une bascule fluide vers un humain quand il faut conclure.",
      ],
    },
    benefits: [
      "Zéro nuit blanche sur WhatsApp",
      "Des ventes encaissées même pendant que vous dormez",
      "Une charge mentale enfin libérée",
    ],
  },
  "vocal-ia": {
    short: "Agent Vocal IA",
    title: "Un secrétariat d'élite qui décroche à votre place — 7j/7, sans jamais rater un appel.",
    pain: {
      title: "Le constat qui fait mal",
      text: "Chaque appel manqué, c'est un rendez-vous perdu, un patient parti chez le concurrent, un client qui ne rappellera plus jamais.",
    },
    install: {
      title: "Ce que nous installons pour vous",
      bullets: [
        "Un clone vocal naturel qui décroche en votre nom et répond aux questions courantes.",
        "La prise de rendez-vous automatique dans votre calendrier (Google, Outlook, Calendly).",
        "Une notification immédiate pour les appels VIP que vous voulez gérer en personne.",
      ],
    },
    benefits: [
      "Zéro appel manqué, même en réunion",
      "Un calendrier qui se remplit tout seul",
      "L'image d'une entreprise carrée et premium",
    ],
  },
  "saas-prospection": {
    short: "SaaS Prospection B2B & Chatbots de site",
    title: "Exploitez les logiciels les plus puissants du monde pour remplir votre calendrier de rendez-vous.",
    pain: {
      title: "Le constat qui fait mal",
      text: "Trouver des clients B2B prend trop de temps. Et les abonnements logiciels coûtent une fortune pour rien si personne ne sait les paramétrer correctement.",
    },
    install: {
      title: "La solution partenaire que nous configurons",
      bullets: [
        "Des machines de prospection automatisées à grande échelle (extraction de données cibles, tunnels d'emails personnalisés).",
        "Un chatbot omnicanal branché sur votre site qui attrape le visiteur et le transfère sur WhatsApp en 1 clic.",
        "Les meilleurs outils SaaS du marché, paramétrés sur mesure pour votre activité.",
      ],
    },
    benefits: [
      "Plus de prospection manuelle fastidieuse",
      "Aucun surmenage commercial",
      "Un flux continu de prospects qualifiés",
    ],
  },
};

const SolutionPage = () => {
  const { slug } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const sol = slug ? data[slug] : null;
  if (!sol) return <Navigate to="/" replace />;

  const open = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onGetStarted={open} />

      <section className="pt-36 lg:pt-44 pb-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-electric transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
          </Link>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">{sol.short}</span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-foreground"
          >
            {sol.title}
          </motion.h1>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <button onClick={open} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-electric text-white text-sm font-semibold rounded-full hover:opacity-90 transition-all">
              Réserver mon audit gratuit <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 max-w-4xl grid md:grid-cols-2 gap-10">
          <div className="rounded-3xl border border-border p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">{sol.pain.title}</h2>
            <p className="text-base text-muted-foreground leading-relaxed">{sol.pain.text}</p>
          </div>
          <div className="rounded-3xl bg-electric/5 border border-electric/20 p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-electric mb-4">{sol.install.title}</h2>
            <ul className="space-y-3">
              {sol.install.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-sm text-foreground/85 leading-relaxed">
                  <Check className="h-5 w-5 text-electric shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">Vos bénéfices nets</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-foreground">
            Ce que vous gagnez vraiment.
          </h2>
          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {sol.benefits.map((b, i) => (
              <div key={i} className="rounded-2xl border border-border p-7 text-left">
                <div className="h-10 w-10 rounded-xl bg-electric/10 text-electric flex items-center justify-center mb-4">
                  <Check className="h-5 w-5" />
                </div>
                <p className="font-semibold text-foreground">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
      <OnboardingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default SolutionPage;
