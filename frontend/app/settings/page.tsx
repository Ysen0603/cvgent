"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useAuth } from "../../context/AuthContext"
import { getGeminiApiKey, setGeminiApiKey } from "../../lib/api/gemini"
import { updateUserProfile } from "../../lib/api/auth"
import { uploadCv, deleteCv } from "../../lib/api/userCv"
import AccountSettingsForm from "../../components/AccountSettingsForm"
import GeminiApiKeySettings from "../../components/GeminiApiKeySettings"
import CvManagementSection from "../../components/CvManagementSection"
import { Settings, Sparkles } from "lucide-react"

const SettingsPage: React.FC = () => {
  const { user, fetchCurrentUser: refetchUser, updateUserCvProfile } = useAuth()
  const [username, setUsername] = useState(user?.username || "")
  const [email, setEmail] = useState(user?.email || "")
  const [geminiApiKey, setGeminiApiKeyInput] = useState("")
  const [currentGeminiApiKey, setCurrentGeminiApiKey] = useState<string | null>(null)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [cvUploadMessage, setCvUploadMessage] = useState("")
  const [cvUploadError, setCvUploadError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true)
      const geminiResponse = await getGeminiApiKey()
      if (geminiResponse && geminiResponse.api_key) {
        setCurrentGeminiApiKey(geminiResponse.api_key)
      } else {
        setCurrentGeminiApiKey(null)
      }
      await refetchUser()
      setLoading(false)
    }
    fetchInitialData()
  }, [])

  useEffect(() => {
    if (user) {
      setUsername(user.username || "")
      setEmail(user.email || "")
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setError("")
    let success = true
    let updated = false

    const profileData: { username?: string; email?: string } = {}
    if (username && username !== user?.username) {
      profileData.username = username
    }
    if (email && email !== user?.email) {
      profileData.email = email
    }

    if (Object.keys(profileData).length > 0) {
      const userUpdateSuccess = await updateUserProfile(profileData)
      if (userUpdateSuccess) {
        setMessage("Account information updated successfully!")
        await refetchUser()
        updated = true
      } else {
        setError("Failed to update account information.")
        success = false
      }
    }

    if (geminiApiKey) {
      const geminiKeySuccess = await setGeminiApiKey(geminiApiKey)
      if (geminiKeySuccess) {
        setMessage((prev) => prev + (prev ? " " : "") + "Gemini API Key updated successfully!")
        setCurrentGeminiApiKey(geminiApiKey)
        setGeminiApiKeyInput("")
        updated = true
      } else {
        setError((prev) => prev + (prev ? " " : "") + "Failed to update Gemini API Key.")
        success = false
      }
    }

    if (!updated && success) {
      setMessage("Nothing to update.")
    }
  }

  const handleCvUpload = async (fileToUpload: File) => {
    setCvUploadMessage("")
    setCvUploadError("")
    setLoading(true)
    try {
      await uploadCv(fileToUpload)
      const updatedProfile = await uploadCv(fileToUpload)
      setCvUploadMessage("CV uploaded successfully!")
      setCvFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
      updateUserCvProfile(updatedProfile)
    } catch (err) {
      console.error("Error uploading CV:", err)
      setCvUploadError("Failed to upload CV. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setCvFile(file)
      handleCvUpload(file)
    } else {
      setCvFile(null)
    }
  }

  const handleCvDelete = async () => {
    setCvUploadMessage("");
    setCvUploadError("");
    setLoading(true);
    // Optimistically remove the CV from the UI before deleting
    updateUserCvProfile({ ...user?.userprofile, cv_url: null, cv_file: null });
    // Add a small delay to allow the PdfPreview component to unmount and release the file handle
    await new Promise(resolve => setTimeout(resolve, 100));
    try {
      await deleteCv(); // This now returns null on success
      setCvUploadMessage('CV deleted successfully!');
      updateUserCvProfile(null); // Directly update context to clear CV
    } catch (err) {
      console.error('Error deleting CV:', err);
      setCvUploadError('Failed to delete CV. Please try again.');
      // Optionally restore the CV if deletion failed
      await refetchUser();
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <>
        
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
            <p className="text-blue-700 font-semibold">Loading settings...</p>
          </div>
        </div>
      </>
    )
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
              <span>Account Management</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
                Settings
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Manage your account information, API configuration, and CV uploads in one
              <span className="text-blue-600 font-semibold"> secure place</span>.
            </p>
          </div>

          {/* Main Content */}
          <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Global Messages */}
                {message && (
                  <div className="bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-green-700 font-medium">{message}</p>
                  </div>
                )}
                {error && (
                  <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <p className="text-red-700 font-medium">{error}</p>
                  </div>
                )}

                <AccountSettingsForm
                  username={username}
                  email={email}
                  setUsername={setUsername}
                  setEmail={setEmail}
                  message={message}
                  error={error}
                />

                <GeminiApiKeySettings
                  geminiApiKey={geminiApiKey}
                  setGeminiApiKeyInput={setGeminiApiKeyInput}
                  currentGeminiApiKey={currentGeminiApiKey}
                  message={message}
                  error={error}
                />

                {/* Submit Button */}
                <div className="flex justify-center pt-8">
                  <button
                    type="submit"
                    className="cursor-pointer group relative flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
                  >
                    <Settings className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    <span className="relative z-10">Update Settings</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </button>
                </div>
              </form>
            </div>

            <CvManagementSection
              user={user}
              cvFile={cvFile}
              setCvFile={setCvFile}
              cvUploadMessage={cvUploadMessage}
              cvUploadError={cvUploadError}
              fileInputRef={fileInputRef}
              handleCvFileChange={handleCvFileChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsPage
