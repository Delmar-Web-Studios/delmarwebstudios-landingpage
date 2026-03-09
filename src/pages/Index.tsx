import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { OnboardingModal } from "@/components/OnboardingModal";
import { Footer } from "@/components/Footer";
import { BlueBubbles } from "@/components/BlueBubbles";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background relative">
      <BlueBubbles />
      <Navbar onGetStarted={() => setModalOpen(true)} />
      <HeroSection onCta={() => setModalOpen(true)} />
      <ServicesSection />
      <PortfolioSection />
      <Footer />
      <OnboardingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Index;
