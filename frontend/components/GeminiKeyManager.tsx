"use client";
import React, { useState, useEffect } from 'react';
import { getGeminiApiKey, setGeminiApiKey } from '../lib/api/gemini';

const GeminiKeyManager: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [currentApiKey, setCurrentApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApiKey = async () => {
      setLoading(true);
      const response = await getGeminiApiKey();
      if (response && response.api_key) {
        setCurrentApiKey(response.api_key);
      } else {
        setCurrentApiKey(null);
      }
      setLoading(false);
    };
    fetchApiKey();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (!apiKey) {
      setError('API Key cannot be empty.');
      return;
    }

    const success = await setGeminiApiKey(apiKey);
    if (success) {
      setMessage('Gemini API Key saved successfully!');
      setCurrentApiKey(apiKey);
      setApiKey(''); // Clear input field
    } else {
      setError('Failed to save Gemini API Key. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading API Key...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Gemini API Key</h2>
      {message && <p className="text-green-600 text-center mb-4">{message}</p>}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {currentApiKey ? (
        <p className="text-gray-700 mb-4 text-center">
          Current API Key is set. (For security, full key is not displayed)
        </p>
      ) : (
        <p className="text-gray-700 mb-4 text-center">No Gemini API Key currently set.</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="apiKey" className="block text-gray-700 text-sm font-bold mb-2">
            New Gemini API Key
          </label>
          <input
            type="password"
            id="apiKey"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Gemini API Key"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Save API Key
        </button>
      </form>
    </div>
  );
};

export default GeminiKeyManager;