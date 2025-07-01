"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getGeminiApiKey, setGeminiApiKey } from '../../lib/api/gemini';
import { updateUserProfile } from '../../lib/api/auth'; // This function will be created/modified

const SettingsPage: React.FC = () => {
  const { user, fetchCurrentUser: refetchUser } = useAuth();
  console.log('User from AuthContext (initial/re-render):', user);
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [geminiApiKey, setGeminiApiKeyInput] = useState('');
  const [currentGeminiApiKey, setCurrentGeminiApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
    }
    const fetchKeysAndUser = async () => {
      setLoading(true);
      // Fetch Gemini API Key
      const geminiResponse = await getGeminiApiKey();
      if (geminiResponse && geminiResponse.api_key) {
        setCurrentGeminiApiKey(geminiResponse.api_key);
      } else {
        setCurrentGeminiApiKey(null);
      }
      setLoading(false);
    };
    fetchKeysAndUser();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    let success = true;

    // Update User Profile
    if (username !== user?.username || email !== user?.email) {
      const userUpdateSuccess = await updateUserProfile({ username, email });
      if (userUpdateSuccess) {
        setMessage('Account information updated successfully!');
        await refetchUser(); // Re-fetch user data to update context
        /* console.log('User after refetchUser (inside handleSubmit):', user);
        console.log('Local states after refetchUser (inside handleSubmit):', { username, email }); */
      } else {
        setError('Failed to update account information.');
        success = false;
      }
    }

    // Update Gemini API Key
    if (geminiApiKey) {
      const geminiKeySuccess = await setGeminiApiKey(geminiApiKey);
      if (geminiKeySuccess) {
        setMessage(prev => prev + (prev ? ' ' : '') + 'Gemini API Key updated successfully!');
        setCurrentGeminiApiKey(geminiApiKey);
        setGeminiApiKeyInput(''); // Clear input field
      } else {
        setError(prev => prev + (prev ? ' ' : '') + 'Failed to update Gemini API Key.');
        success = false;
      }
    }

    
  };

  if (loading) {
    return <div className="text-center py-8">Loading settings...</div>;
  }

  return (
    <main className="flex flex-1 justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h2>
          <p className="mt-2 text-sm text-gray-600">Manage your account information and API key.</p>
        </div>
        <form className="mt-8 space-y-6 bg-white p-6 sm:p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
          {message && <p className="text-green-600 text-center mb-4">{message}</p>}
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">Account Information</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 pb-1.5" htmlFor="username">Username</label>
                <input
                  autoComplete="username"
                  className="form-input block w-full rounded-lg border-gray-300 shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] sm:text-sm py-3 px-4 placeholder-gray-400"
                  id="username"
                  name="username"
                  placeholder="e.g. JohnDoe"
                  required
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 pb-1.5" htmlFor="email">Email address</label>
                <input
                  autoComplete="email"
                  className="form-input block w-full rounded-lg border-gray-300 shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] sm:text-sm py-3 px-4 placeholder-gray-400"
                  id="email"
                  name="email"
                  placeholder="e.g. john.doe@example.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <p className="mt-1 text-xs text-gray-500">Leave blank if you don't want to change it.</p>
              </div>
            </div>
          </section>
          <section className="pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">API Configuration</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 pb-1.5" htmlFor="api-key">Gemini API Key</label>
              <input
                className="form-input block w-full rounded-lg border-gray-300 shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] sm:text-sm py-3 px-4 placeholder-gray-400"
                id="api-key"
                name="api-key"
                placeholder="Enter your Gemini API Key"
                type="password"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKeyInput(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">Your API key is stored securely and used solely for CV analysis.</p>
              {
                currentGeminiApiKey ? (
                  <p className="mt-1 text-xs text-green-800">Current API Key is set. (For security, full key is not displayed)</p>
                ) : (
                  <p className="mt-1 text-xs text-gray-500">No Gemini API Key set.</p>
                )
              }
            </div>
          </section>
          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              className="group relative flex justify-center rounded-md border border-transparent bg-[var(--primary-color)] hover:bg-[var(--text-primary)] cursor-pointer py-2.5 px-6 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 transition-colors"
            >
              Update Settings
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SettingsPage;