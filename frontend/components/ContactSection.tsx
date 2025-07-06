"use client"
import { useState } from "react"
import type React from "react"

import { Send, Mail, MessageCircle, User, Sparkles, CheckCircle, AlertCircle } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus("Sending...")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (data.success) {
        setStatus("Message sent successfully!")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setStatus("Failed to send message.")
      }
    } catch (error) {
      setStatus("Failed to send message.")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = () => {
    if (status.includes("successfully")) return <CheckCircle className="w-5 h-5 text-green-500" />
    if (status.includes("Failed")) return <AlertCircle className="w-5 h-5 text-red-500" />
    return null
  }

  const getStatusColor = () => {
    if (status.includes("successfully")) return "bg-green-50/80 border-green-200 text-green-700"
    if (status.includes("Failed")) return "bg-red-50/80 border-red-200 text-red-700"
    return "bg-blue-50/80 border-blue-200 text-blue-700"
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-10 animate-bounce delay-500"></div>
      </div>

      <div className="relative container mx-auto px-6 py-16 md:py-24">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 text-blue-700 text-sm font-medium mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span>Get in Touch</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
              Contact Us
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions or need support? We're here to help you
            <span className="text-blue-600 font-semibold"> optimize your CV</span> and
            <span className="text-purple-600 font-semibold"> land your dream job</span>.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 md:p-12 border border-white/20 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/10 to-blue-500/10 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              {/* Form Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Send us a Message</h3>
                  <p className="text-gray-600">We'll get back to you within 24 hours</p>
                </div>
              </div>

              {/* Status Message */}
              {status && (
                <div
                  className={`flex items-center gap-3 p-4 rounded-2xl mb-6 backdrop-blur-sm border ${getStatusColor()}`}
                >
                  {getStatusIcon()}
                  <p className="font-medium">{status}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold text-gray-800 mb-3">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      placeholder="Enter your full name"
                      className="w-full pl-11 pr-4 py-4 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-inner placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-lg font-semibold text-gray-800 mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      placeholder="Enter your email address"
                      className="w-full pl-11 pr-4 py-4 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-inner placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-lg font-semibold text-gray-800 mb-3">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 py-4 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-inner placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none disabled:opacity-50"
                    />
                    <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                      {formData.message.length} characters
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="cursor-pointer group  w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                        <span className="relative z-10">Send Message</span>
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </button>
                </div>
              </form>

              {/* Additional Info */}
              <div className="mt-8 bg-blue-50/80 backdrop-blur-sm p-6 rounded-2xl border border-blue-200/50">
                <h4 className="font-bold text-blue-800 mb-3">💬 What to expect:</h4>
                <ul className="text-blue-700 text-sm space-y-2">
                  <li>• Response within 24 hours during business days</li>
                  <li>• Personalized support for your CV optimization needs</li>
                  <li>• Technical assistance with our AI analysis tools</li>
                  <li>• Guidance on maximizing your job search success</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Email Support</h4>
                  <p className="text-gray-600 text-sm">Get help via email</p>
                </div>
              </div>
              <p className="text-blue-600 font-semibold">yassineennaya2264@gmail.com</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Response Time</h4>
                  <p className="text-gray-600 text-sm">Average response time</p>
                </div>
              </div>
              <p className="text-purple-600 font-semibold">Within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
