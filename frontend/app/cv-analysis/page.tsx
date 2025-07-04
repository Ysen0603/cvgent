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
    <div className="mx-auto px-4 py-8 ">
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-[var(--text-primary)] text-3xl sm:text-4xl font-bold leading-tight tracking-tight">Optimize Your CV in Seconds</h2>
        <p className="text-[var(--text-secondary)] text-base sm:text-lg font-normal leading-relaxed max-w-xl mx-auto">
          Simply upload your CV and paste the job description. Our AI will analyze them and provide actionable insights.
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-2">
      
          
          <CVAnalysisForm onAnalysisComplete={handleAnalysisComplete} />
        
        {analysisResult && <CVAnalysisResult analysisResult={analysisResult} />}
      </div>
    </div>
  );
};

export default CVAnalysisPage;