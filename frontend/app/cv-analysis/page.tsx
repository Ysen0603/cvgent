"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import CVAnalysisForm from "../../components/CVAnalysisForm"
import CVAnalysisResult from "../../components/CVAnalysisResult"
import type { CVAnalysisResponse } from "../../types/analysis"
import { Sparkles, Target, Zap } from "lucide-react"

const CVAnalysisPage: React.FC = () => {
  const { fetchCurrentUser } = useAuth()
  const [analysisResult, setAnalysisResult] = useState<CVAnalysisResponse | null>(null)

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  const handleAnalysisComplete = (result: CVAnalysisResponse | null) => {
    setAnalysisResult(result)
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-10 animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-6 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 text-blue-700 text-sm font-medium mb-6 shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Analysis</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
                Optimize Your CV
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 mt-2">in Seconds</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Simply paste the job description. Our AI will analyze your CV and provide
              <span className="text-blue-600 font-semibold"> actionable insights</span> to boost your chances.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200">
                <Target className="w-4 h-4 text-blue-500" />
                <span className="text-gray-700 font-medium">Instant Analysis</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-gray-700 font-medium">AI-Powered</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mx-auto">
            <CVAnalysisForm onAnalysisComplete={handleAnalysisComplete} />
            <CVAnalysisResult analysisResult={analysisResult} />
          </div>
        </div>
      </div>
    </>
  )
}

export default CVAnalysisPage
