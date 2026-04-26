import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OnboardingModal } from "@/components/OnboardingModal";

const CONTACT_EMAIL = "info@delmarwebstudios.qzz.io";

export default function PolitiqueConfidentialite() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar onGetStarted={() => setModalOpen(true)} />

      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Politique de <span className="text-gradient-blue">Confidentialité</span>
          </h1>
          <p className="text-muted-foreground mb-12">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>

          <article className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              Chez Delmar Web Studios, nous accordons la plus grande importance à la protection
              de vos données personnelles. Cette politique décrit quelles données nous
              collectons et comment nous les utilisons.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-6">1. Données collectées</h2>
            <p>
              Nous collectons uniquement les informations que vous nous fournissez volontairement
              via nos formulaires : nom, entreprise, secteur, numéro WhatsApp, adresse email,
              date et créneau de rendez-vous, ainsi que les informations liées à vos paiements.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-6">2. Utilisation des données</h2>
            <p>
              Vos données servent uniquement à vous contacter, planifier nos rendez-vous,
              exécuter nos prestations et traiter vos paiements. Elles ne sont jamais vendues
              à des tiers.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-6">3. Stockage et sécurité</h2>
            <p>
              Les données sont stockées de manière sécurisée sur notre infrastructure
              (Supabase) avec des règles d'accès strictes (Row Level Security). Les
              communications sont chiffrées via HTTPS.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-6">4. Durée de conservation</h2>
            <p>
              Les données de prospects et clients sont conservées tant que la relation
              commerciale est active, puis archivées pendant la durée légale exigée par la
              comptabilité.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-6">5. Vos droits</h2>
            <p>
              Vous disposez d'un droit d'accès, de rectification et de suppression de vos
              données. Consultez aussi notre{" "}
              <Link to="/legal/suppression-donnees" className="text-electric font-medium hover:underline">
                politique de suppression de données
              </Link>
              .
            </p>

            <h2 className="text-base font-semibold text-foreground mt-6">6. Cookies</h2>
            <p>
              Notre site utilise uniquement des cookies techniques essentiels au bon
              fonctionnement de la plateforme. Aucun cookie publicitaire n'est déposé.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-6">7. Contact</h2>
            <p>
              Pour toute question liée à vos données personnelles, écrivez-nous à{" "}
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
