"use client";
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { analyzeCV } from '../lib/api/analysis';
import { CVAnalysisResponse } from '../types/analysis';
import Link from 'next/link';
import { FileText, TrendingUp } from 'lucide-react'; // Removed Upload, File
import { useAuth } from '../context/AuthContext';

interface CVAnalysisFormProps {
  onAnalysisComplete: (result: CVAnalysisResponse | null) => void;
}

const CVAnalysisForm: React.FC<CVAnalysisFormProps> = ({ onAnalysisComplete }) => {
  const { user } = useAuth();
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if user has a CV
  const hasCv = !!user?.userprofile?.cv_url;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!jobDescription.trim()) {
      setError('Please enter a job description.');
      return;
    }

    setLoading(true);
    // The backend will now use the stored CV, so we don't pass cvFile
    const result = await analyzeCV(jobDescription);
    setLoading(false);

    if (result) {
      onAnalysisComplete(result);
    } else {
      setError('Failed to analyze CV. Please check your gemini api key and try again.');
      onAnalysisComplete(null);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-xl p-6 sm:p-8 ">
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-semibold text-[var(--text-primary)] pb-2" htmlFor="job-description">
            Paste Job Description
          </label>
          <textarea
            className="form-input min-h-48 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] sm:text-sm"
            id="job-description"
            name="job-description"
            placeholder="Paste the full job description here..."
            rows={8}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
            disabled={!hasCv}
          ></textarea>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
        <div className="text-sm text-gray-500 w-full sm:w-auto">
          <p>Your CV is automatically analyzed from your profile</p>
          {!hasCv && (
            <p className="text-red-600 font-semibold mt-2">No CV found in your settings. Please upload your CV in the settings page to enable analysis.</p>
          )}
        </div>
        
      </div>
      <div className="flex flex-col items-center w-full sm:w-auto mt-6">
          <button
            className="btn-primary cursor-pointer w-1/2 flex justify-center rounded-md bg-blue-600 px-4 py-3 text-base font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            onClick={handleSubmit}
            disabled={loading || !hasCv}
          >
            {loading ? 'Analyzing...' : 'Analyze Now'}
          </button>
          {error && <p className="text-red-600 text-center mt-2 w-full">{error}</p>}
        </div>
      {loading && (
        <div className="flex flex-col items-center justify-center mt-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-3 text-blue-600">Analyzing your CV...</p>
        </div>
      )}
    </div>
  );
};

export default CVAnalysisForm;