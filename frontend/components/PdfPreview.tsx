import React from "react";

interface PdfPreviewProps {
  url: string;
}

// Helper to extract filename from a URL
function getFilenameFromUrl(url: string): string | null {
  try {
    const parts = url.split("/");
    return parts[parts.length - 1] || null;
  } catch {
    return null;
  }
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ url }) => {
  if (!url) return null;
  const filename = getFilenameFromUrl(url);
  // Use the new Django endpoint for inline preview
  const previewUrl = filename ? `/api/media/${filename}` : url;
  return (
    <div className="w-full h-96 mt-2 border rounded overflow-hidden">
      <iframe
        src={previewUrl}
        title="CV Preview"
        width="100%"
        height="100%"
        className="w-full h-full"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default PdfPreview;
