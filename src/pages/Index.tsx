import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { OnboardingModal } from "@/components/OnboardingModal";
import { Footer } from "@/components/Footer";
import { BlueBubbles } from "@/components/BlueBubbles";
import { PromiseSection, TestimonialsSection, UrgencySection, FaqSection } from "@/components/LandingExtras";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const open = () => setModalOpen(true);

  return (
    <div className="min-h-screen bg-background relative">
      <BlueBubbles />
      <Navbar onGetStarted={open} />
      <HeroSection onCta={open} />
      <PromiseSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ServicesSection />
      <UrgencySection onCta={open} />
      <FaqSection />
      <Footer />
      <OnboardingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Index;
