import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import ContactSection from "../components/ContactSection";
import AppFooter from "../components/AppFooter";

export default function Home() {
  return (
    <div className="bg-[var(--background-light)] text-[var(--text-primary)]">
      <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <main className="flex flex-1 flex-col items-center justify-center">
            <HeroSection />
            <FeaturesSection />
            <ContactSection />
          </main>
          <AppFooter />
        </div>
      </div>
    </div>
  );
}
