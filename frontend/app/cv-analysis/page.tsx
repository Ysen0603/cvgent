"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import CVAnalysisForm from '../../components/CVAnalysisForm'; // Keep for job description input
import CVAnalysisResult from '../../components/CVAnalysisResult';
import { CVAnalysisResponse } from '../../types/analysis';

const CVAnalysisPage: React.FC = () => {
  const { fetchCurrentUser } = useAuth();
  const [analysisResult, setAnalysisResult] = useState<CVAnalysisResponse | null>(null);

  useEffect(() => {
    // Ensure user data is fresh to get the latest CV URL
    fetchCurrentUser();
  }, []);

  const handleAnalysisComplete = (result: CVAnalysisResponse | null) => {
    setAnalysisResult(result);
  };

  return (
    <div className="mx-auto p-8 ">
      <div className="text-center mb-12">
        <h2 className="text-[var(--text-primary)] text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-4">
          Optimize Your CV in Seconds
        </h2>
        <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl mx-auto">
          Simply paste the job description. Our AI will analyze your CV and provide actionable insights.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
        <CVAnalysisForm onAnalysisComplete={handleAnalysisComplete} />
        <div className="max-h-[500px]">
          {analysisResult ? (
            <CVAnalysisResult analysisResult={analysisResult} />
          ) : (
            <div className="bg-white shadow-xl rounded-xl p-8 h-full flex flex-col items-center justify-center text-center">
              
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Analysis Results
              </h3>
              <p className="text-gray-500 max-w-xs">
                Submit a job description to see your CV analysis results
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVAnalysisPage;