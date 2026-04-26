import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OnboardingModal } from "@/components/OnboardingModal";

const CONTACT_EMAIL = "info@delmarwebstudios.qzz.io";

export default function SuppressionDonnees() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar onGetStarted={() => setModalOpen(true)} />

      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Politique de <span className="text-gradient-blue">Suppression de Données</span>
          </h1>
          <p className="text-muted-foreground mb-12">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>

          <article className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              Conformément aux meilleures pratiques en matière de protection des données et au
              RGPD, vous pouvez à tout moment demander la suppression complète de vos données
              personnelles détenues par Delmar Web Studios.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-6">1. Données concernées</h2>
            <p>
              La suppression couvre l'ensemble des informations que nous détenons sur vous :
              fiche prospect ou client, historique des rendez-vous, échanges enregistrés,
              transactions de paiement et toute pièce jointe transmise.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-6">2. Comment demander la suppression</h2>
            <p>
              Envoyez une demande par email à{" "}
              <a href={`mailto:${CONTACT_EMAIL}?subject=Demande%20de%20suppression%20de%20donn%C3%A9es`} className="text-electric font-medium hover:underline">
                {CONTACT_EMAIL}
              </a>{" "}
              avec pour objet <em>« Demande de suppression de données »</em>. Indiquez le nom,
              l'email et/ou le numéro WhatsApp utilisés lors de votre prise de contact afin que
              nous puissions identifier votre dossier.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-6">3. Délai de traitement</h2>
            <p>
              Nous traitons les demandes de suppression sous un délai maximum de{" "}
              <strong className="text-foreground">30 jours</strong> à compter de la réception
              du message. Une confirmation écrite vous sera envoyée une fois la suppression
              effectuée.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-6">4. Données conservées par obligation légale</h2>
            <p>
              Certaines données (factures, justificatifs de paiement) peuvent être conservées
              au-delà de votre demande lorsque la loi l'exige (obligations comptables et
              fiscales). Ces données sont alors archivées de manière restreinte et ne sont plus
              utilisées à des fins commerciales.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-6">5. Suppression automatique</h2>
            <p>
              Les leads inactifs depuis plus de 24 mois et n'ayant donné lieu à aucun contrat
              sont automatiquement purgés de notre base.
            </p>

            <h2 className="text-base font-semibold text-foreground mt-6">6. Contact</h2>
            <p>
              Pour toute question sur cette procédure, contactez-nous à{" "}
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
