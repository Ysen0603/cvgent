"use client";
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import { analyzeCV } from '../lib/api/analysis';
import { CVAnalysisResponse } from '../types/analysis';

const CVAnalysisForm: React.FC = () => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState<CVAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    } else {
      setCvFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setAnalysisResult(null);

    if (!cvFile) {
      setError('Please upload a CV file.');
      return;
    }
    if (!jobDescription.trim()) {
      setError('Please enter a job description.');
      return;
    }

    setLoading(true);
    const result = await analyzeCV(cvFile, jobDescription);
    setLoading(false);

    if (result) {
      setAnalysisResult(result);
    } else {
      setError('Failed to analyze CV. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">CV Analysis</h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {loading && <p className="text-blue-600 text-center mb-4">Analyzing CV, please wait...</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="cvFile" className="block text-gray-700 text-sm font-bold mb-2">
            Upload CV (PDF)
          </label>
          <input
            type="file"
            id="cvFile"
            accept=".pdf"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            onChange={handleFileChange}
            required
          />
          {cvFile && <p className="mt-2 text-sm text-gray-500">Selected file: {cvFile.name}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="jobDescription" className="block text-gray-700 text-sm font-bold mb-2">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            rows={8}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze CV'}
        </button>
      </form>

      {analysisResult && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-4 text-center">Analysis Results</h3>
          <div className="mb-4">
            <p className="font-semibold">Corresponding Score:</p>
            <p className="text-lg text-blue-700">{analysisResult.score}/100</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">The Why:</p>
            <p className="text-gray-800 whitespace-pre-wrap">{analysisResult.why}</p>
          </div>
          <div className="prose max-w-none"> {/* Add prose class for styling */}
            <p className="font-semibold">Improvements:</p>
            <ReactMarkdown>{analysisResult.improvements}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVAnalysisForm;