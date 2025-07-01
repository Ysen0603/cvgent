"use client"
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex items-center justify-between whitespace-nowrap px-6 py-4">
        <div className="flex items-center gap-3 text-[var(--text-primary)]">
          <svg className="h-8 w-8 text-[var(--primary-color)]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
          </svg>
          <h2 className="text-2xl font-bold leading-tight tracking-tighter">CVgent</h2>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link className="nav-link text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-sm font-medium leading-normal" href="/">
            Home
          </Link>
          <Link className="nav-link text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-sm font-medium leading-normal" href="#features">
            Features
          </Link>
          <Link className="nav-link text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-sm font-medium leading-normal" href="#contact">
            Contact
          </Link>
          
          {isAuthenticated && (
            <>
              <Link className="nav-link text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-sm font-medium leading-normal" href="/cv-analysis">
                CV Analysis
              </Link>
              <Link className="nav-link text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-sm font-medium leading-normal" href="/settings">
                Settings
              </Link>
            </>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-[var(--text-secondary)]">
                Welcome, {user?.username || 'User'}
              </span>
              <button 
                onClick={logout}
                className="cta-button min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 text-white text-sm font-semibold leading-normal tracking-[0.01em] shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="cta-button w-full sm:w-auto flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 text-white text-base font-semibold leading-normal tracking-[0.01em] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" href="/cv-analysis">
                    <span className="truncate">Get Started</span>
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden text-[var(--primary-color)]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-3.75 5.25h-9.75" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;