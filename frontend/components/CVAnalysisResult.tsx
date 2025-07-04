"use client";
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { CVAnalysisResponse } from '../types/analysis';

interface CVAnalysisResultProps {
  analysisResult: CVAnalysisResponse | null;
}

const CVAnalysisResult: React.FC<CVAnalysisResultProps> = ({ analysisResult }) => {
  if (!analysisResult) {
    return null; // Or a placeholder if no results yet
  }

  return (
    <div className="bg-white shadow-sm rounded-xl p-6 sm:p-8">
      <h3 className="text-2xl font-bold mb-6 text-center text-[var(--text-primary)]">Analysis Results</h3>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-[var(--text-primary)]">Corresponding Score</p>
            <span className="text-xl font-bold text-blue-700">{analysisResult.score}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full"
              style={{ width: `${analysisResult.score}%` }}
            ></div>
          </div>
          <p className="mt-3 text-sm text-blue-700">
            {analysisResult.score >= 80 ? 'Excellent match!' :
             analysisResult.score >= 60 ? 'Good match' :
             'Needs improvement'}
          </p>
        </div>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
          <h4 className="font-bold text-lg text-[var(--text-primary)] mb-3">The Why</h4>
          <p className="text-[var(--text-secondary)] whitespace-pre-wrap">{analysisResult.why}</p>
        </div>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
          <h4 className="font-bold text-lg text-[var(--text-primary)] mb-3">Improvements</h4>
          <div className="mt-2 prose max-w-none text-[var(--text-secondary)]">
            <ReactMarkdown>{analysisResult.improvements}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVAnalysisResult;