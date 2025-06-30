import pypdf

def parse_pdf_to_text(pdf_file):
    """
    Parses a PDF file and extracts its text content.
    """
    try:
        reader = pypdf.PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text
    except Exception as e:
        print(f"Error parsing PDF: {e}")
        return None