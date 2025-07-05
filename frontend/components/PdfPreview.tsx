import type React from "react"
import { ExternalLink, FileText} from "lucide-react"

interface PdfPreviewProps {
  url: string
}

// Helper to extract filename from a URL
function getFilenameFromUrl(url: string): string | null {
  try {
    const parts = url.split("/")
    return parts[parts.length - 1] || null
  } catch {
    return null
  }
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ url }) => {
  if (!url) return null

  const filename = getFilenameFromUrl(url)
  // Use the new Django endpoint for inline preview
  const previewUrl = filename ? `/api/media/${filename}` : url

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-lg text-gray-800">CV Preview</h4>
            <p className="text-sm text-gray-600">{filename || "Your uploaded CV"}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 text-sm font-medium shadow-lg"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Open</span>
          </a>
        </div>
      </div>

      {/* Preview Container */}
      <div className="relative bg-gray-50 rounded-2xl overflow-hidden shadow-inner border border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 pointer-events-none"></div>
        <iframe
          src={previewUrl}
          title="CV Preview"
          className="w-full h-96 relative z-10"
          style={{ border: "none" }}
          onLoad={() => {
            // Optional: Add loading state management here
          }}
          onError={() => {
            // Optional: Add error state management here
          }}
        />

        {/* Loading Overlay - you can add state management for this */}
        <div
          className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300"
          id="pdf-loading"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
            <p className="text-gray-600 font-medium">Loading preview...</p>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>PDF loaded successfully</span>
        </div>
        <span>Click and drag to navigate</span>
      </div>
    </div>
  )
}

export default PdfPreview
