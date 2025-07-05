"use client"
import type React from "react"
import { useState } from "react"
import { analyzeCV } from "../lib/api/analysis"
import type { CVAnalysisResponse } from "../types/analysis"
import Link from "next/link"
import { FileText, TrendingUp, AlertCircle, Settings } from "lucide-react"
import { useAuth } from "../context/AuthContext"

interface CVAnalysisFormProps {
  onAnalysisComplete: (result: CVAnalysisResponse | null) => void
}

const CVAnalysisForm: React.FC<CVAnalysisFormProps> = ({ onAnalysisComplete }) => {
  const { user } = useAuth()
  const [jobDescription, setJobDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const hasCv = !!user?.userprofile?.cv_url

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!jobDescription.trim()) {
      setError("Please enter a job description.")
      return
    }

    setLoading(true)
    const result = await analyzeCV(jobDescription)
    setLoading(false)

    if (result) {
      onAnalysisComplete(result)
    } else {
      setError("Failed to analyze CV. Please check your gemini api key and try again.")
      onAnalysisComplete(null)
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Only allow changes if CV is available and not loading
    if (hasCv && !loading) {
      setJobDescription(e.target.value)
    }
  }

  const isTextareaDisabled = !hasCv || loading

  return (
    <div className="relative">
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-white/20 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/10 to-blue-500/10 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Job Description</h3>
              <p className="text-gray-600">Paste the job posting below</p>
            </div>
          </div>

          {/* CV Status */}
          <div
            className={`flex items-center gap-3 p-4 rounded-2xl mb-6 ${
              hasCv ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
            }`}
          >
            <div className={`w-3 h-3 rounded-full ${hasCv ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></div>
            <div className="flex-1">
              <p className={`font-semibold ${hasCv ? "text-green-700" : "text-red-700"}`}>
                {hasCv ? "CV Ready for Analysis" : "No CV Found"}
              </p>
              <p className={`text-sm ${hasCv ? "text-green-600" : "text-red-600"}`}>
                {hasCv ? "Your CV will be automatically analyzed" : "Please upload your CV in settings first"}
              </p>
            </div>
            {!hasCv && (
              <Link
                href="/settings"
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-300"
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Settings</span>
              </Link>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-3" htmlFor="job-description">
                Job Description
              </label>
              <div className="relative">
                <textarea
                  className={`w-full min-h-[200px] px-4 py-4 backdrop-blur-sm border-2 rounded-2xl shadow-inner placeholder-gray-400 focus:outline-none transition-all duration-300 resize-none ${
                    isTextareaDisabled
                      ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white/70 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-text"
                  }`}
                  id="job-description"
                  name="job-description"
                  placeholder={
                    !hasCv
                      ? "Please upload your CV in settings first to enable job description analysis..."
                      : loading
                        ? "Analysis in progress..."
                        : "Paste the complete job description here... Include requirements, responsibilities, and qualifications for the best analysis."
                  }
                  rows={8}
                  value={jobDescription}
                  onChange={handleTextareaChange}
                  required
                  readOnly={isTextareaDisabled}
                />
                <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                  {jobDescription.length} characters
                </div>

                {/* Overlay for disabled state */}
                {isTextareaDisabled && (
                  <div className="absolute inset-0 bg-gray-100/50 rounded-2xl flex items-center justify-center">
                    <div className="text-center p-4">
                      <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 font-medium">
                        {!hasCv ? "Upload CV to enable" : "Analysis in progress..."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                disabled={loading || !hasCv || !jobDescription.trim()}
                className="cursor-pointer w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
              >

                    <TrendingUp className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    <span>Analyze Now</span>
                
                {!loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                )}
              </button>

              {error && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-2xl w-full">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              )}
            </div>
          </form>

          {/* Loading State */}
          {loading && (
            <div className="mt-8 flex flex-col items-center justify-center p-8 bg-blue-50 rounded-2xl border border-blue-200">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="mt-4 text-blue-700 font-semibold">Analyzing your CV against job requirements...</p>
              <p className="text-blue-600 text-sm">This may take a few moments</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CVAnalysisForm
