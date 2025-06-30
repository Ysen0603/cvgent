import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[var(--background-light)] text-[var(--text-primary)]">
      <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">

          <main className="flex flex-1 flex-col items-center justify-center">
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

            <section className="w-full py-16 md:py-24 bg-[var(--background-light)]" id="features">
              <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">Why Choose CVgent?</h2>
                  <p className="mt-4 text-lg text-[var(--text-secondary)]">Unlock the full potential of your resume.</p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex items-center justify-center size-12 rounded-full bg-[var(--primary-color)] text-white mb-6">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">AI-Powered Analysis</h3>
                    <p className="text-[var(--text-secondary)] text-sm">Get data-driven insights on how your CV stacks up against specific job requirements using advanced AI algorithms.</p>
                  </div>
                  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex items-center justify-center size-12 rounded-full bg-[var(--primary-color)] text-white mb-6">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Personalized Feedback</h3>
                    <p className="text-[var(--text-secondary)] text-sm">Receive actionable suggestions and tailored recommendations to optimize your CV content, structure, and keywords.</p>
                  </div>
                  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex items-center justify-center size-12 rounded-full bg-[var(--primary-color)] text-white mb-6">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Boost Your Chances</h3>
                    <p className="text-[var(--text-secondary)] text-sm">Increase your interview call-backs by ensuring your CV is perfectly aligned with what employers are looking for.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="w-full py-16 md:py-24 bg-white" id="contact">
              <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">Get in Touch</h2>
                  <p className="mt-4 text-lg text-[var(--text-secondary)]">Have questions or need support? We're here to help.</p>
                </div>
                <div className="max-w-xl mx-auto bg-[var(--background-light)] p-8 rounded-xl shadow-xl">
                  <form action="#" className="space-y-6" method="POST">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)]" htmlFor="name">Full Name</label>
                      <input className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] sm:text-sm" id="name" name="name" type="text"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)]" htmlFor="email">Email Address</label>
                      <input className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] sm:text-sm" id="email" name="email" type="email"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)]" htmlFor="message">Message</label>
                      <textarea className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] sm:text-sm" id="message" name="message" rows={4}></textarea>
                    </div>
                    <div>
                      <button className="w-full cta-button flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-[#1c75d3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)]" type="submit">
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </main>

          <footer className="bg-slate-800 text-slate-300">
            <div className="container mx-auto px-6 py-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
                <div>
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <svg className="h-7 w-7 text-[var(--primary-color)]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
                    <h2 className="text-xl font-semibold text-white">CVgent</h2>
                  </div>
                  <p className="text-sm">AI-powered CV optimization for job seekers.</p>
                </div>
                <div className="flex flex-col gap-2 items-center md:items-start">
                  <Link className="hover:text-[var(--primary-color)] transition-colors text-sm" href="/">Home</Link>
                  <Link className="hover:text-[var(--primary-color)] transition-colors text-sm" href="#features">Features</Link>
                  <Link className="hover:text-[var(--primary-color)] transition-colors text-sm" href="#contact">Contact Us</Link>
                </div>
                <div className="flex flex-col gap-2 items-center md:items-start">
                  <Link className="hover:text-[var(--primary-color)] transition-colors text-sm" href="#">Privacy Policy</Link>
                  <Link className="hover:text-[var(--primary-color)] transition-colors text-sm" href="#">Terms of Service</Link>
                </div>
              </div>
              <div className="mt-8 border-t border-slate-700 pt-8 text-center text-sm">
                <p>© 2024 CVgent. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
