import { Brain, ListChecks, Rocket } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-[var(--background-light)]" id="features">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">Why Choose CVgent?</h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">Unlock the full potential of your resume.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-center size-12 rounded-full bg-[var(--primary-color)] text-white mb-6">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">AI-Powered Analysis</h3>
            <p className="text-[var(--text-secondary)] text-sm">Get data-driven insights on how your CV stacks up against specific job requirements using advanced AI algorithms.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-center size-12 rounded-full bg-[var(--primary-color)] text-white mb-6">
              <ListChecks className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Personalized Feedback</h3>
            <p className="text-[var(--text-secondary)] text-sm">Receive actionable suggestions and tailored recommendations to optimize your CV content, structure, and keywords.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-center size-12 rounded-full bg-[var(--primary-color)] text-white mb-6">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Boost Your Chances</h3>
            <p className="text-[var(--text-secondary)] text-sm">Increase your interview call-backs by ensuring your CV is perfectly aligned with what employers are looking for.</p>
          </div>
        </div>
      </div>
    </section>
  );
}