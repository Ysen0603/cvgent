"use client";
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(username, password);
    if (!success) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      <div className="mx-auto flex w-full max-w-lg flex-col px-6">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="text-blue-600">
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 48 48">
              <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">CVgent</h1>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-xl sm:p-10">
          <div className="w-full">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-800">Welcome back</h2>
              <p className="mt-2 text-sm text-slate-600">Sign in to access your account.</p>
            </div>
            <div className="mt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium leading-6 text-slate-700" htmlFor="username">
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      autoComplete="username"
                      className="form-input block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                      id="username"
                      name="username"
                      placeholder="Enter your username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium leading-6 text-slate-700" htmlFor="password">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      autoComplete="current-password"
                      className="form-input block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 checked:bg-[image:--checkbox-tick-svg]" id="remember-me" name="remember-me" type="checkbox"/>
                    <label className="ml-2 block text-sm text-slate-700" htmlFor="remember-me">Remember me</label>
                  </div>
                  <div className="text-sm">
                    <a className="font-medium text-blue-600 hover:text-blue-500" href="#">Forgot password?</a>
                  </div>
                </div>
                <div>
                  <button
                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    type="submit"
                  >
                    Log in
                  </button>
                </div>
                {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
              </form>
              <p className="mt-10 text-center text-sm text-slate-500">
                Not a member?
                <Link className="font-semibold leading-6 text-blue-600 hover:text-blue-500" href="/register">Create an account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;