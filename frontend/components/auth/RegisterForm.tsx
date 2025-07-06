"use client"
import type React from "react"
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import Link from "next/link"
import { User, Mail, Lock, UserPlus, Eye, EyeOff, Sparkles, AlertCircle, FileText, CheckCircle } from "lucide-react"

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register } = useAuth()

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const getPasswordStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return { text: "Very Weak", color: "text-red-600", bg: "bg-red-500" }
      case 2:
        return { text: "Weak", color: "text-orange-600", bg: "bg-orange-500" }
      case 3:
        return { text: "Fair", color: "text-yellow-600", bg: "bg-yellow-500" }
      case 4:
        return { text: "Good", color: "text-blue-600", bg: "bg-blue-500" }
      case 5:
        return { text: "Strong", color: "text-green-600", bg: "bg-green-500" }
      default:
        return { text: "", color: "", bg: "" }
    }
  }

  const passwordStrength = getPasswordStrength(password)
  const strengthInfo = getPasswordStrengthText(passwordStrength)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (password !== password2) {
      setError("Passwords do not match.")
      setIsLoading(false)
      return
    }

    if (passwordStrength < 3) {
      setError("Please choose a stronger password.")
      setIsLoading(false)
      return
    }

    try {
      const success = await register(username,password)
      if (!success) {
        setError("Registration failed. Please try again.")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden flex items-center justify-center py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-10 animate-bounce delay-500"></div>
      </div>

      <div className="relative w-[60vh] mx-auto px-6">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 text-blue-700 text-sm font-medium mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span>Join CVgent</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4 ">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
              CVgent
            </h1>
          </div>
        </div>

        {/* Register Card */}
        <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-white/20 relative overflow-hidden w-[60vh]">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/10 to-blue-500/10 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative z-10 ">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
              <p className="text-gray-600">Join thousands optimizing their CVs with AI</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl mb-6">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-lg font-semibold text-gray-800 mb-3">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    autoComplete="username"
                    className={`w-full pl-11 pr-4 py-4 backdrop-blur-sm border-2 rounded-2xl shadow-inner placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                      isLoading
                        ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-white/70 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-text"
                    }`}
                    id="username"
                    name="username"
                    placeholder="Choose a unique username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-lg font-semibold text-gray-800 mb-3">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    autoComplete="new-password"
                    className={`w-full pl-11 pr-12 py-4 backdrop-blur-sm border-2 rounded-2xl shadow-inner placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                      isLoading
                        ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-white/70 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-text"
                    }`}
                    id="password"
                    name="password"
                    placeholder="Create a strong password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300 z-10"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Password Strength</span>
                      <span className={`text-sm font-semibold ${strengthInfo.color}`}>{strengthInfo.text}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${strengthInfo.bg}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="password2" className="block text-lg font-semibold text-gray-800 mb-3">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    autoComplete="new-password"
                    className={`w-full pl-11 pr-12 py-4 backdrop-blur-sm border-2 rounded-2xl shadow-inner placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                      isLoading
                        ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                        : password2 && password !== password2
                          ? "bg-white/70 border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-text"
                          : password2 && password === password2
                            ? "bg-white/70 border-green-300 focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-text"
                            : "bg-white/70 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-text"
                    }`}
                    id="password2"
                    name="password2"
                    placeholder="Confirm your password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300 z-10"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {password2 && (
                  <div className="mt-2 flex items-center gap-2">
                    {password === password2 ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600 font-medium">Passwords match</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-600 font-medium">Passwords don't match</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={
                    isLoading ||
                    !username.trim() ||
                    !password.trim() ||
                    !password2.trim() ||
                    password !== password2 ||
                    passwordStrength < 3
                  }
                  className="cursor-pointer relative w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      <span className="relative z-10">Create Account</span>
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </button>
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-blue-600 hover:text-purple-600 transition-colors duration-300"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            {/* Benefits Preview */}
            <div className="mt-8 bg-purple-50/80 backdrop-blur-sm p-6 rounded-2xl border border-purple-200/50">
              <h4 className="font-bold text-purple-800 mb-3">🎉 Join thousands who've improved their careers:</h4>
              <ul className="text-purple-700 text-sm space-y-2">
                <li>• Get instant AI-powered CV analysis</li>
                <li>• Receive personalized improvement suggestions</li>
                <li>• Track your optimization progress over time</li>
                <li>• Access premium job matching features</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Secure Registration</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-500"></div>
              <span>Privacy Protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
