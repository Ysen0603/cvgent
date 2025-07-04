"use client";
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { analyzeCV } from '../lib/api/analysis';
import { CVAnalysisResponse } from '../types/analysis';
import Link from 'next/link';
import { FileText, TrendingUp } from 'lucide-react'; // Removed Upload, File

interface CVAnalysisFormProps {
  onAnalysisComplete: (result: CVAnalysisResponse | null) => void;
}

const CVAnalysisForm: React.FC<CVAnalysisFormProps> = ({ onAnalysisComplete }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    <div className="w-full lg:w-1/2 p-4 bg-white rounded-xl shadow-lg flex flex-col">
      <div className="flex flex-col w-full gap-8">
        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-10 space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-[var(--text-primary)] pb-2" htmlFor="job-description">
                <FileText className="inline-block align-middle mr-2 h-6 w-6 text-[var(--primary-color)]" />
                Paste Job Description
              </label>
              <textarea
                className="form-input min-h-48 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] sm:text-sm"
                id="job-description"
                name="job-description"
                placeholder="Paste the full job description here..."
                rows={10}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button
              className="btn-primary w-full sm:w-auto flex justify-center rounded-md bg-blue-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              <TrendingUp className="inline-block align-middle mr-2 h-5 w-5" />
              {loading ? 'Analyzing...' : 'Analyze Now'}
            </button>
          </div>
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
          {loading &&
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default CVAnalysisForm;