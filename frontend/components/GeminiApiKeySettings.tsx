"use client"

import type React from "react"
import { Key, Shield, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

interface GeminiApiKeySettingsProps {
  geminiApiKey: string
  setGeminiApiKeyInput: (key: string) => void
  currentGeminiApiKey: string | null
  message: string
  error: string
}

const GeminiApiKeySettings: React.FC<GeminiApiKeySettingsProps> = ({
  geminiApiKey,
  setGeminiApiKeyInput,
  currentGeminiApiKey,
  message,
  error,
}) => {
  const [showApiKey, setShowApiKey] = useState(false)

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-white/20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/10 to-blue-500/10 rounded-full translate-y-12 -translate-x-12"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg">
            <Key className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">API Configuration</h3>
            <p className="text-gray-600">Secure your Gemini API access</p>
          </div>
        </div>

        {/* API Key Status */}
        <div
          className={`flex items-center gap-3 p-4 rounded-2xl mb-6 ${
            currentGeminiApiKey ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
          }`}
        >
          <Shield className={`w-5 h-5 ${currentGeminiApiKey ? "text-green-500" : "text-red-500"}`} />
          <div className="flex-1">
            <p className={`font-semibold ${currentGeminiApiKey ? "text-green-700" : "text-red-700"}`}>
              {currentGeminiApiKey ? "API Key Configured" : "No API Key Set"}
            </p>
            <p className={`text-sm ${currentGeminiApiKey ? "text-green-600" : "text-red-600"}`}>
              {currentGeminiApiKey
                ? "Your API key is securely stored and ready for CV analysis"
                : "Add your Gemini API key to enable CV analysis features"}
            </p>
          </div>
          <div
            className={`w-3 h-3 rounded-full ${currentGeminiApiKey ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
          ></div>
        </div>

        {/* API Key Input */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-3" htmlFor="api-key">
            Gemini API Key
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Key className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="w-full pl-12 pr-12 py-4 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-inner placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              id="api-key"
              name="api-key"
              placeholder="Enter your Gemini API Key"
              type={showApiKey ? "text" : "password"}
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKeyInput(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-4 bg-purple-50/80 backdrop-blur-sm p-4 rounded-2xl border border-purple-200/50">
            <p className="text-purple-700 text-sm font-medium mb-2">🔐 Security Information</p>
            <ul className="text-purple-600 text-sm space-y-1">
              <li>• Your API key is encrypted and stored securely</li>
              <li>• Used exclusively for CV analysis features</li>
              <li>• Never shared with third parties</li>
              <li>• Get your free API key from Google AI Studio</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeminiApiKeySettings
