import HeroSection from "../components/HeroSection";

export default function Home() {
  return (
    <div className="bg-[var(--background-light)] text-[var(--text-primary)]">
      <div className="relative flex size-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <main className="flex flex-1 flex-col items-center justify-center">
            <HeroSection />
          </main>
        </div>
      </div>
    </div>
  );
}