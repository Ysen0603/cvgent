"use client"

import type React from "react"
import { User, Mail } from "lucide-react"

interface AccountSettingsFormProps {
  username: string
  email: string
  setUsername: (username: string) => void
  setEmail: (email: string) => void
  message: string
  error: string
}

const AccountSettingsForm: React.FC<AccountSettingsFormProps> = ({
  username,
  email,
  setUsername,
  setEmail,
  message,
  error,
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-white/20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/10 to-blue-500/10 rounded-full translate-y-12 -translate-x-12"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Account Information</h3>
            <p className="text-gray-600">Update your personal details</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Username Field */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3" htmlFor="username">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                autoComplete="username"
                className="w-full pl-11 pr-4 py-4 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-inner placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                id="username"
                name="username"
                placeholder="e.g. JohnDoe"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                autoComplete="email"
                className="w-full pl-11 pr-4 py-4 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-inner placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                id="email"
                name="email"
                placeholder="e.g. john.doe@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Help Text */}
          <div className="bg-blue-50/80 backdrop-blur-sm p-4 rounded-2xl border border-blue-200/50">
            <p className="text-blue-700 text-sm font-medium">
              💡 Leave fields blank if you don't want to change them. Changes will be saved when you click "Update
              Settings".
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountSettingsForm
