import Link from "next/link";

export default function AppFooter() {
  return (
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
          <p>© 2025 CVgent. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}