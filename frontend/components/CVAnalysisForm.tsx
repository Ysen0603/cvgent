"use client";
import React, { useState, useRef } from 'react'; // Import useRef
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import { analyzeCV } from '../lib/api/analysis';
import { CVAnalysisResponse } from '../types/analysis';
import Link from 'next/link'; // Import Link
// Removed: import CVAnalysisResult from './CVAnalysisResult'; // Import CVAnalysisResult

interface CVAnalysisFormProps {
  onAnalysisComplete: (result: CVAnalysisResponse | null) => void;
}

const CVAnalysisForm: React.FC<CVAnalysisFormProps> = ({ onAnalysisComplete }) => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  // Removed: const [analysisResult, setAnalysisResult] = useState<CVAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null); // Create a ref for the file input

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    } else {
      setCvFile(null);
    }
  };

  const handleDivClick = () => {
    fileInputRef.current?.click(); // Trigger click on hidden file input
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Removed: setAnalysisResult(null);

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
      onAnalysisComplete(result); // Pass result to parent
    } else {
      setError('Failed to analyze CV. Please check your gemini api key and try again.');
      onAnalysisComplete(null); // Pass null to parent on failure
    }
  };

  return (
    <main className="flex flex-1 justify-center w-1/2">
      <div className="flex flex-col w-full gap-8">
        
        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-10 space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-[var(--text-primary)] pb-2" htmlFor="cv-upload">
                <svg className="inline-block align-middle mr-2 h-6 w-6 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                Upload Your CV (PDF)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-[var(--border-color)] border-dashed rounded-xl hover:border-[var(--primary-color)] transition-colors duration-200 bg-slate-50 cursor-pointer" onClick={handleDivClick}>
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  <div className="flex text-sm text-[var(--text-secondary)]">
                    <p className="pl-1">Drag and drop your PDF file here, or <span className="font-medium text-[var(--primary-color)]">click to browse</span></p>
                  </div>
                  <p className="text-xs text-gray-500">Max file size: 5MB</p>
                </div>
                <input accept=".pdf" className="sr-only" id="cv-upload" name="cv-upload" type="file" onChange={handleFileChange} ref={fileInputRef} />
              </div>
              {cvFile && <p className="mt-2 text-sm text-gray-500 text-center">Selected file: {cvFile.name}</p>}
            </div>
            <div>
              <label className="block text-lg font-semibold text-[var(--text-primary)] pb-2" htmlFor="job-description">
                <svg className="inline-block align-middle mr-2 h-6 w-6 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
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
              <svg className="inline-block align-middle mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
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
    </main>
  );
};

export default CVAnalysisForm;