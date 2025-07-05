import Link from "next/link"
import { ArrowRight, CheckCircle, Sparkles, Zap, Target } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[calc(100vh-75px)] flex items-center justify-center overflow-hidden">
      {/* Clean Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-blue-100 to-transparent transform -skew-y-12"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-transparent via-purple-100 to-transparent transform skew-y-12"></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce"></div>
      </div>

      <div className="relative container mx-auto px-6 text-center z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 text-blue-700 text-sm font-medium mb-8 shadow-lg">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered CV Analysis</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl mb-6">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
            Craft Your
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
            Perfect CV
          </span>
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-700 mt-2">
            with CVgent
          </span>
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-3xl mx-auto text-xl text-gray-600 md:text-2xl leading-relaxed">
          Leverage cutting-edge AI to analyze your CV against job descriptions.
          <span className="text-blue-600 font-semibold"> Identify key improvements</span> and
          <span className="text-purple-600 font-semibold"> boost your chances</span> of landing your dream job.
        </p>

        {/* Stats */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-700 font-medium">98% Success Rate</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-700 font-medium">10k+ CVs Analyzed</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200">
            <Target className="w-5 h-5 text-blue-500" />
            <span className="text-gray-700 font-medium">5min Analysis</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link
            className="group relative w-full sm:w-auto flex min-w-[220px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-14 px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold leading-normal tracking-wide shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
            href="/cv-analysis"
          >
            <span className="relative z-10 flex items-center gap-2">
              Analyze Your CV Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          <Link
            className="group w-full sm:w-auto flex min-w-[220px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-14 px-8 bg-white/80 backdrop-blur-sm border-2 border-gray-300 text-gray-700 text-lg font-bold leading-normal tracking-wide hover:bg-white hover:border-blue-400 hover:text-blue-600 hover:shadow-xl transition-all duration-300"
            href="#features"
          >
            <span className="flex items-center gap-2">
              Learn More
              <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:animate-ping"></div>
            </span>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60">
          <div className="text-sm text-gray-500 font-medium">Trusted by professionals at</div>
          <div className="flex items-center gap-6">
            <div className="px-4 py-2 bg-white/40 rounded-lg text-gray-600 font-semibold">Google</div>
            <div className="px-4 py-2 bg-white/40 rounded-lg text-gray-600 font-semibold">Microsoft</div>
            <div className="px-4 py-2 bg-white/40 rounded-lg text-gray-600 font-semibold">Amazon</div>
            <div className="px-4 py-2 bg-white/40 rounded-lg text-gray-600 font-semibold">Meta</div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}