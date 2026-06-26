import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { LogosMarquee } from "@/components/LogosMarquee";
import { PainSection } from "@/components/PainSection";
import { SolutionsGrid } from "@/components/SolutionsGrid";
import { TestimonialFeature } from "@/components/TestimonialFeature";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { OnboardingModal } from "@/components/OnboardingModal";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const open = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white relative">
      <Navbar onGetStarted={open} />
      <HeroSection onCta={open} />
      <LogosMarquee />
      <PainSection />
      <SolutionsGrid />
      <TestimonialFeature />
      <ContactSection />
      <Footer />
      <OnboardingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Index;
