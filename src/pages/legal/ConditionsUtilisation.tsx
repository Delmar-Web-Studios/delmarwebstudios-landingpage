import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OnboardingModal } from "@/components/OnboardingModal";

const CONTACT_EMAIL = "info@delmarwebstudios.qzz.io";

export default function ConditionsUtilisation() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar onGetStarted={() => setModalOpen(true)} />

      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Conditions <span className="text-gradient-blue">d'Utilisation</span>
          </h1>
          <p className="text-muted-foreground mb-12">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>

          <article className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              Bienvenue sur Delmar Web Studios. En accédant à notre site et en utilisant nos
              services (conception web, e-commerce, automatisation IA), vous acceptez les
              présentes conditions d'utilisation.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-6">1. Services proposés</h2>
            <p>
              Delmar Web Studios fournit des prestations de création de sites web premium, de
              boutiques e-commerce et de déploiement d'agents IA conversationnels. Chaque
              prestation fait l'objet d'un devis personnalisé envoyé par WhatsApp ou email.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-6">2. Engagement client</h2>
            <p>
              Le client s'engage à fournir les informations, contenus et accès nécessaires à la
              bonne réalisation du projet. Tout retard imputable au client peut entraîner un
              report du calendrier de livraison.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-6">3. Paiement</h2>
            <p>
              Les paiements s'effectuent en FCFA via Orange Money, MTN MoMo ou tout autre moyen
              convenu. Un acompte est généralement requis avant le démarrage du projet. Les
              factures sont émises électroniquement et envoyées par email.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-6">4. Propriété intellectuelle</h2>
            <p>
              Le code, les designs et les livrables deviennent la propriété du client après
              paiement intégral. Delmar Web Studios conserve le droit d'utiliser le projet à des
              fins de portfolio et de communication, sauf demande contraire écrite.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-6">5. Responsabilité</h2>
            <p>
              Delmar Web Studios met tout en œuvre pour livrer des prestations de qualité, mais
              ne saurait être tenu responsable des interruptions de service liées à des
              prestataires tiers (hébergement, API, fournisseurs de paiement).
            </p>

            <h2 className="text-base font-semibold text-foreground mt-6">6. Modification</h2>
            <p>
              Ces conditions peuvent être mises à jour à tout moment. La version en vigueur est
              celle publiée sur la présente page.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-6">7. Contact</h2>
            <p>
              Pour toute question, contactez-nous à{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-electric font-medium hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </article>
        </div>
      </section>

      <Footer />
      <OnboardingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
