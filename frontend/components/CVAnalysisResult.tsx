"use client"
import type React from "react"
import ReactMarkdown from "react-markdown"
import type { CVAnalysisResponse } from "../types/analysis"
import { TrendingUp, Lightbulb, Target, Award, AlertTriangle } from "lucide-react"

interface CVAnalysisResultProps {
  analysisResult: CVAnalysisResponse | null
}

const CVAnalysisResult: React.FC<CVAnalysisResultProps> = ({ analysisResult }) => {
  if (!analysisResult) {
    return (
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-white/20 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-green-500/10 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center py-16">
          <div className="flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r from-gray-400 to-gray-500 shadow-lg mb-6">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Analysis Results</h3>
          <p className="text-gray-600 max-w-sm leading-relaxed">
            Submit a job description to see your personalized CV analysis and improvement recommendations
          </p>
          <div className="mt-6 flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            <span className="text-gray-600 text-sm">Waiting for analysis...</span>
          </div>
        </div>
      </div>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "from-green-500 to-emerald-600"
    if (score >= 60) return "from-yellow-500 to-orange-600"
    return "from-red-500 to-pink-600"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <Award className="w-6 h-6 text-white" />
    if (score >= 60) return <TrendingUp className="w-6 h-6 text-white" />
    return <AlertTriangle className="w-6 h-6 text-white" />
  }

  const getScoreMessage = (score: number) => {
    if (score >= 80) return "Excellent match! Your CV aligns well with this role."
    if (score >= 60) return "Good match with room for improvement."
    return "Significant improvements needed to match this role."
  }

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-white/20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full translate-y-12 -translate-x-12"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r ${getScoreColor(analysisResult.score)} shadow-lg`}
          >
            {getScoreIcon(analysisResult.score)}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Analysis Complete</h3>
            <p className="text-gray-600">Your CV analysis results</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Score Section */}
          <div className={`bg-gradient-to-r ${getScoreColor(analysisResult.score)} p-6 rounded-3xl shadow-xl`}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-white/90 font-semibold text-lg">Match Score</p>
                <p className="text-white/80 text-sm">{getScoreMessage(analysisResult.score)}</p>
              </div>
              <div className="text-right">
                <span className="text-4xl font-black text-white">{analysisResult.score}</span>
                <span className="text-2xl font-bold text-white/80">/100</span>
              </div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm">
              <div
                className="bg-white h-3 rounded-full shadow-inner transition-all duration-1000 ease-out"
                style={{ width: `${analysisResult.score}%` }}
              ></div>
            </div>
          </div>

          {/* Why Section */}
          <div className="bg-blue-50/80 backdrop-blur-sm p-6 rounded-3xl border border-blue-200/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-xl text-gray-800">Analysis Summary</h4>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{analysisResult.why}</p>
            </div>
          </div>

          {/* Improvements Section */}
          <div className="bg-purple-50/80 backdrop-blur-sm p-6 rounded-3xl border border-purple-200/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-xl text-gray-800">Recommended Improvements</h4>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl prose prose-gray max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-xl font-bold text-gray-800 mb-3">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-lg font-bold text-gray-800 mb-2">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-base font-bold text-gray-800 mb-2">{children}</h3>,
                  p: ({ children }) => <p className="text-gray-700 mb-3 leading-relaxed">{children}</p>,
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-1 text-gray-700 mb-3">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-1 text-gray-700 mb-3">{children}</ol>
                  ),
                  li: ({ children }) => <li className="text-gray-700">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold text-gray-800">{children}</strong>,
                }}
              >
                {analysisResult.improvements}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CVAnalysisResult
