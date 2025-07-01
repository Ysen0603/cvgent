export default function ContactSection() {
  return (
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
  );
}