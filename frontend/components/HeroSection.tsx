import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-color)] via-[#1c75d3] to-[#114e8a]">
          Craft Your Perfect CV with CVgent
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-[var(--text-secondary)] md:text-xl">
          Leverage AI to analyze your CV against job descriptions. Identify key areas for improvement and significantly boost your chances of landing your dream job.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link className="cta-button w-full sm:w-auto flex min-w-[180px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 text-white text-base font-semibold leading-normal tracking-[0.01em] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" href="/cv-analysis">
            <span className="truncate">Analyze Your CV Now</span>
          </Link>
          <Link className="w-full sm:w-auto flex min-w-[180px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-transparent border-2 border-[var(--primary-color)] text-[var(--primary-color)] text-base font-semibold leading-normal tracking-[0.01em] hover:bg-[var(--primary-color)] hover:text-white transition-all duration-300" href="#features">
            <span className="truncate">Learn More</span>
          </Link>
        </div>
      </div>
    </section>
  );
}