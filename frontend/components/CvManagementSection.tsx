"use client"

import type React from "react"
import { FileText, Upload, Trash2, CheckCircle, AlertCircle } from "lucide-react"
import PdfPreview from "./PdfPreview"
import type { User } from "../types/auth"

interface CvManagementSectionProps {
  user: User | null
  cvFile: File | null
  setCvFile: (file: File | null) => void
  cvUploadMessage: string
  cvUploadError: string
  fileInputRef: React.RefObject<HTMLInputElement | null>
  handleCvFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CvManagementSection: React.FC<CvManagementSectionProps> = ({
  user,
  cvFile,
  setCvFile,
  cvUploadMessage,
  cvUploadError,
  fileInputRef,
  handleCvFileChange,
}) => {
  const hasCv = !!user?.userprofile?.cv_url

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-white/20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-500/10 to-red-500/10 rounded-full translate-y-12 -translate-x-12"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r from-green-600 to-blue-600 shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">CV Management</h3>
            <p className="text-gray-600">Upload and manage your resume</p>
          </div>
        </div>

        {/* Messages */}
        {cvUploadMessage && (
          <div className="flex items-center gap-3 p-4 bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-2xl mb-6">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <p className="text-green-700 font-medium">{cvUploadMessage}</p>
          </div>
        )}
        {cvUploadError && (
          <div className="flex items-center gap-3 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl mb-6">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-700 font-medium">{cvUploadError}</p>
          </div>
        )}

        {/* CV Status and Preview */}
        {hasCv ? (
          <div className="bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-green-700 font-semibold">CV Successfully Uploaded</p>
              </div>
              
            </div>
            {user?.userprofile?.cv_url && <PdfPreview url={user.userprofile.cv_url} />}
          </div>
        ) : (
          <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl p-6 mb-6 text-center">
            <FileText className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <p className="text-red-700 font-semibold text-lg mb-2">No CV Currently Uploaded</p>
            <p className="text-red-600">Upload your CV to enable analysis features</p>
          </div>
        )}

        {/* Upload Section */}
        <div>
          <label htmlFor="cv-upload" className="block text-lg font-semibold text-gray-800 mb-4">
            Upload Your CV
          </label>
          <div className="relative">
            <input
              id="cv-upload"
              name="cv-upload"
              type="file"
              accept=".pdf"
              onChange={handleCvFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <label
              htmlFor="cv-upload"
              className="group relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-white/50 backdrop-blur-sm hover:bg-white/70 hover:border-blue-400 transition-all duration-300"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 text-gray-400 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-300" />
                <p className="mb-2 text-sm text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PDF files only (MAX. 10MB)</p>
              </div>
            </label>
          </div>

          {/* Upload Info */}
          <div className="mt-4 bg-blue-50/80 backdrop-blur-sm p-4 rounded-2xl border border-blue-200/50">
            <p className="text-blue-700 text-sm font-medium mb-2">📄 Upload Guidelines</p>
            <ul className="text-blue-600 text-sm space-y-1">
              <li>• Only PDF format is supported</li>
              <li>• Maximum file size: 10MB</li>
              <li>• Ensure text is readable and well-formatted</li>
              <li>• Your CV will be analyzed against job descriptions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CvManagementSection
