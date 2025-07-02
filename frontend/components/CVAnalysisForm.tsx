"use client";
import React, { useState, useRef } from 'react'; // Import useRef
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import { analyzeCV } from '../lib/api/analysis';
import { CVAnalysisResponse } from '../types/analysis';
import Link from 'next/link'; // Import Link
import { Upload, FileText, TrendingUp, File } from 'lucide-react'; // Import Lucide icons

interface CVAnalysisFormProps {
  onAnalysisComplete: (result: CVAnalysisResponse | null) => void;
}

const CVAnalysisForm: React.FC<CVAnalysisFormProps> = ({ onAnalysisComplete }) => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    } else {
      setCvFile(null);
    }
  };

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

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
      onAnalysisComplete(result);
    } else {
      setError('Failed to analyze CV. Please check your gemini api key and try again.');
      onAnalysisComplete(null);
    }
  };

  return (
    <main className="flex flex-1 justify-center w-1/2">
      <div className="flex flex-col w-full gap-8">
        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-10 space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-[var(--text-primary)] pb-2" htmlFor="cv-upload">
                <Upload className="inline-block align-middle mr-2 h-6 w-6 text-[var(--primary-color)]" />
                Upload Your CV (PDF)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-[var(--border-color)] border-dashed rounded-xl hover:border-[var(--primary-color)] transition-colors duration-200 bg-slate-50 cursor-pointer" onClick={handleDivClick}>
                <div className="space-y-1 text-center">
                  <File className="mx-auto h-12 w-12 text-gray-400" />
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
    </main>
  );
};

export default CVAnalysisForm;