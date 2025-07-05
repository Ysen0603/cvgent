"use client"
import type React from "react"
import { useState } from "react"
import { FileText, Menu, X } from "lucide-react"
import Link from "next/link"
import { useAuth } from "../context/AuthContext"

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
            CVgent
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            className="relative text-gray-600 hover:text-blue-600 text-base font-semibold transition-all duration-300 group"
            href="/"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link
            className="relative text-gray-600 hover:text-blue-600 text-base font-semibold transition-all duration-300 group"
            href="/contact"
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </Link>

          {isAuthenticated && (
            <>
              <Link
                className="relative text-gray-600 hover:text-blue-600 text-base font-semibold transition-all duration-300 group"
                href="/cv-analysis"
              >
                CV Analysis
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                className="relative text-gray-600 hover:text-blue-600 text-base font-semibold transition-all duration-300 group"
                href="/settings"
              >
                Settings
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </>
          )}
        </nav>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">Welcome, {user?.username || "User"}</span>
              </div>
              <button
                onClick={logout}
                className="group relative flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-red-500/25 transform hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10">Logout</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </button>
            </>
          ) : (
            <Link
              className="group relative flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
              href="/cv-analysis"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-white/20 shadow-lg">
          <div className="container mx-auto px-6 py-4 space-y-4">
            <Link
              className="block text-gray-600 hover:text-blue-600 text-base font-semibold py-2 transition-colors duration-300"
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              className="block text-gray-600 hover:text-blue-600 text-base font-semibold py-2 transition-colors duration-300"
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  className="block text-gray-600 hover:text-blue-600 text-base font-semibold py-2 transition-colors duration-300"
                  href="/cv-analysis"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  CV Analysis
                </Link>
                <Link
                  className="block text-gray-600 hover:text-blue-600 text-base font-semibold py-2 transition-colors duration-300"
                  href="/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Settings
                </Link>
              </>
            )}

            <div className="pt-4 border-t border-gray-200">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-700">Welcome, {user?.username || "User"}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-bold rounded-xl shadow-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base font-bold rounded-xl shadow-lg"
                  href="/cv-analysis"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
