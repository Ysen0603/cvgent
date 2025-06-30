"use client"
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          CVgent
        </Link>
        <ul className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <li>
                <Link href="/cv-analysis" className="hover:text-gray-300">
                  CV Analysis
                </Link>
              </li>
              <li>
                <Link href="/gemini-key-management" className="hover:text-gray-300">
                  Manage API Key
                </Link>
              </li>
              <li>
                <span className="text-gray-400">Welcome, {user?.username || 'User'}</span>
              </li>
              <li>
                <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" className="hover:text-gray-300">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-gray-300">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;