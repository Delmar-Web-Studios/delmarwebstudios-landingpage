import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { OnboardingModal } from "@/components/OnboardingModal";
import logoMaison from "@/assets/logo-maison-blanche.png.asset.json";
import logoJecam from "@/assets/logo-jecam.png.asset.json";
import logoEcole from "@/assets/logo-ecole-canadienne.png.asset.json";
import logoInpolitics from "@/assets/logo-inpolitics.png.asset.json";
import logoSauvons from "@/assets/logo-sauvonstonexam.png.asset.json";

const cases = [
  {
    logo: logoSauvons.url,
    name: "SauvonsTonExam",
    sector: "Soutien scolaire · Application éducative",
    website: "https://sauvonstonexam.qzz.io",
    win: "Landing page avec tuteur IA 100% hors-ligne pour maximiser la visibilité auprès des élèves sans consommer leur data.",
    quote: "Nous avons gagné une énorme quantité de temps et nous pouvons enfin nous concentrer sur l'essentiel.",
    author: "Enguene Tryphene, Fondateur",
  },
  {
    logo: logoEcole.url,
    name: "École Canadienne Inter-Nations",
    sector: "Établissement scolaire international",
    website: "https://ecolecanadienne.ca",
    win: "Site web optimisé pour générer des demandes d'admission directes — sans paperasse interminable pour le diplôme DESO depuis Yaoundé.",
    quote: "Nos inscriptions se font enfin en ligne, simplement, et nous économisons des heures d'administration.",
    author: "Direction des admissions",
  },
  {
    logo: logoMaison.url,
    name: "La Maison Blanche Afanayo",
    sector: "Résidence hôtelière de luxe",
    website: "https://maisonblancheafanayo.com",
    win: "Système d'acquisition directe en 1 clic sur WhatsApp pour couper les intermédiaires gourmands et automatiser les réservations.",
    quote: "Plus de commissions abusives, nos réservations arrivent directement dans notre poche.",
    author: "Manager général",
  },
  {
    logo: logoInpolitics.url,
    name: "Inpolitics Institute",
    sector: "Institut d'élite",
    website: "https://inpoliticsinstitute.com",
    win: "Site haut de gamme conçu pour capter immédiatement l'intérêt des décideurs et cadres supérieurs.",
    quote: "Une vitrine digne du sérieux de notre institut, qui inspire confiance dès la première seconde.",
    author: "Direction",
  },
  {
    logo: logoJecam.url,
    name: "JECAM — Junior Entreprise Cameroun",
    sector: "Junior entreprise",
    website: "https://jecam.vercel.app",
    win: "Vitrine business ultra-rapide déployée sur Vercel pour décrocher des contrats corporatifs en un temps record.",
    quote: "Nous avons signé nos premiers contrats corporates dans les semaines suivant la mise en ligne.",
    author: "Bureau exécutif",
  },
];

const Portfolio = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const open = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onGetStarted={open} />

      <section className="pt-36 lg:pt-44 pb-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">Nos réussites</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-foreground">
            Des entreprises qui <span className="text-electric">encaissent</span> grâce à nos systèmes.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Chaque projet est mesuré à un seul critère : combien de temps et d'argent vous avez gagné.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl space-y-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="rounded-3xl border border-border bg-white p-8 lg:p-10 hover:border-electric/40 hover:shadow-premium transition-all"
            >
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-3 flex md:flex-col items-center md:items-start gap-4">
                  <img src={c.logo} alt={c.name} className="h-20 w-20 object-contain" />
                </div>
                <div className="md:col-span-9 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{c.name}</h3>
                    <p className="text-sm text-electric font-medium mt-1">{c.sector}</p>
                    {c.website && (
                      <a href={c.website} target="_blank" rel="noopener noreferrer"
                         className="inline-block mt-2 text-xs font-medium text-foreground/60 hover:text-electric transition-colors break-all">
                        🔗 {c.website.replace(/^https?:\/\//, "")}
                      </a>
                    )}
                  </div>
                  <p className="text-base text-foreground/80 leading-relaxed">{c.win}</p>
                  <div className="pt-4 border-t border-border">
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-electric text-electric" />)}
                    </div>
                    <p className="text-sm italic text-foreground/70">« {c.quote} »</p>
                    <p className="text-xs text-muted-foreground mt-2">— {c.author}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <ContactSection />
      <Footer />
      <OnboardingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Portfolio;
