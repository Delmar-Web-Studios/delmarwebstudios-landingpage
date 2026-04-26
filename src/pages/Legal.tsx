import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OnboardingModal } from "@/components/OnboardingModal";
import { BlueBubbles } from "@/components/BlueBubbles";

const CONTACT_EMAIL = "info@delmarwebstudios.qzz.io";

export default function Legal() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background relative">
      <BlueBubbles />
      <Navbar onGetStarted={() => setModalOpen(true)} />

      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Mentions <span className="text-gradient-blue">Légales</span>
          </h1>
          <p className="text-muted-foreground mb-12">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>

          {/* Conditions d'utilisation */}
          <article id="conditions" className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Conditions d'Utilisation</h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Bienvenue sur Delmar Web Studios. En accédant à notre site et en utilisant nos
                services (conception web, e-commerce, automatisation IA), vous acceptez les
                présentes conditions d'utilisation.
              </p>
              <h3 className="text-base font-semibold text-foreground mt-6">1. Services proposés</h3>
              <p>
                Delmar Web Studios fournit des prestations de création de sites web premium, de
                boutiques e-commerce et de déploiement d'agents IA conversationnels. Chaque
                prestation fait l'objet d'un devis personnalisé envoyé par WhatsApp ou email.
              </p>
              <h3 className="text-base font-semibold text-foreground mt-6">2. Engagement client</h3>
              <p>
                Le client s'engage à fournir les informations, contenus et accès nécessaires à la
                bonne réalisation du projet. Tout retard imputable au client peut entraîner un
                report du calendrier de livraison.
              </p>
              <h3 className="text-base font-semibold text-foreground mt-6">3. Paiement</h3>
              <p>
                Les paiements s'effectuent en FCFA via Orange Money, MTN MoMo ou tout autre moyen
                convenu. Un acompte est généralement requis avant le démarrage du projet.
              </p>
              <h3 className="text-base font-semibold text-foreground mt-6">4. Propriété intellectuelle</h3>
              <p>
                Le code, les designs et les livrables deviennent la propriété du client après
                paiement intégral. Delmar Web Studios conserve le droit d'utiliser le projet à des
                fins de portfolio.
              </p>
              <h3 className="text-base font-semibold text-foreground mt-6">5. Contact</h3>
              <p>
                Pour toute question, contactez-nous à{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-electric font-medium hover:underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
          </article>

          {/* Politique de confidentialité */}
          <article id="confidentialite">
            <h2 className="text-2xl font-bold mb-4">Politique de Confidentialité</h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Chez Delmar Web Studios, nous accordons la plus grande importance à la protection
                de vos données personnelles.
              </p>
              <h3 className="text-base font-semibold text-foreground mt-6">1. Données collectées</h3>
              <p>
                Nous collectons uniquement les informations que vous nous fournissez volontairement
                via nos formulaires : nom, entreprise, secteur, numéro WhatsApp, adresse email et
                informations de paiement.
              </p>
              <h3 className="text-base font-semibold text-foreground mt-6">2. Utilisation des données</h3>
              <p>
                Vos données servent uniquement à vous contacter, planifier nos rendez-vous,
                exécuter nos prestations et traiter vos paiements. Elles ne sont jamais vendues à
                des tiers.
              </p>
              <h3 className="text-base font-semibold text-foreground mt-6">3. Stockage</h3>
              <p>
                Les données sont stockées de manière sécurisée sur notre infrastructure
                (Supabase) avec des règles d'accès strictes (RLS).
              </p>
              <h3 className="text-base font-semibold text-foreground mt-6">4. Vos droits</h3>
              <p>
                Vous disposez d'un droit d'accès, de rectification et de suppression de vos
                données. Pour exercer ces droits, écrivez-nous à{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-electric font-medium hover:underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
              <h3 className="text-base font-semibold text-foreground mt-6">5. Cookies</h3>
              <p>
                Notre site utilise uniquement des cookies techniques essentiels au bon
                fonctionnement de la plateforme.
              </p>
            </div>
          </article>
        </div>
      </section>

      <Footer />
      <OnboardingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
