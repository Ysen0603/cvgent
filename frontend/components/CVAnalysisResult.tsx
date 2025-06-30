"use client";
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { CVAnalysisResponse } from '../types/analysis';

interface CVAnalysisResultProps {
  analysisResult: CVAnalysisResponse | null;
}

const CVAnalysisResult: React.FC<CVAnalysisResultProps> = ({ analysisResult }) => {
  if (!analysisResult) {
    return null; // Or a placeholder if no results yet
  }

  return (
    <div className="h-full bg-white shadow-xl rounded-xl p-6 sm:p-8 w-1/2">
      <h3 className="text-2xl font-bold mb-6 text-center text-[var(--text-primary)]">Analysis Results</h3>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-semibold text-[var(--text-primary)]">Corresponding Score:</p>
          <div className="flex items-center mt-2">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${analysisResult.score}%` }}
              ></div>
            </div>
            <span className="ml-4 text-xl font-bold text-blue-700">{analysisResult.score}/100</span>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg">
          <p className="font-semibold text-[var(--text-primary)]">The Why:</p>
          <p className="mt-2 text-[var(--text-secondary)] whitespace-pre-wrap">{analysisResult.why}</p>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg">
          <p className="font-semibold text-[var(--text-primary)]">Improvements:</p>
          <div className="mt-2 prose max-w-none text-[var(--text-secondary)]">
            <ReactMarkdown>{analysisResult.improvements}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVAnalysisResult;