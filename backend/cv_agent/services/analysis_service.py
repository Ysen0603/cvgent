from django.contrib.auth.models import User
from cv_agent.models import GeminiAPIKey, CVAnalysisResult
from cv_agent.services.pdf_parser_service import parse_pdf_to_text
from cv_agent.services.gemini_service import get_gemini_response
from cv_agent.services.output_parsers import CVAnalysisOutputParser
from langchain_core.exceptions import OutputParserException

def analyze_cv_and_job_description(user: User, cv_file, job_description_text: str):
    """
    Orchestrates the CV analysis process using Gemini API.
    """
    try: 
        # 1. Retrieve Gemini API Key
        try:
            gemini_api_key_obj = GeminiAPIKey.objects.get(user=user)
            api_key = gemini_api_key_obj.api_key
        except GeminiAPIKey.DoesNotExist:
            return {"error": "Gemini API key not found for this user."}, 400

        # 2. Parse PDF CV
        cv_file.seek(0) # Ensure the file pointer is at the beginning
        cv_text = parse_pdf_to_text(cv_file)
        if not cv_text:
            return {"error": "Could not parse text from PDF CV."}, 400

        # 3. Construct Prompt for Gemini
        prompt = (
            f"Analyze the following CV and job description. "            f"Provide a 'Corresponding Score' (0-100), 'The why' (explanation for the score), "            f"and 'Improvements' (advice to get the job). "            f"Your response MUST use these exact phrases, each on a new line and enclosed in double asterisks: '**Corresponding Score**', '**The why**', '**Improvements**'.\n\n"            f"CV:\n{cv_text}\n\n"            f"Job Description:\n{job_description_text}"
        )

        # 4. Get Gemini Response
        gemini_raw_response = get_gemini_response(api_key, prompt)
        if not gemini_raw_response:
            return {"error": "Failed to get response from Gemini API."}, 500

        # 5. Parse Gemini Response using custom parser
        parser = CVAnalysisOutputParser()
        try:
            parsed_result = parser.parse(gemini_raw_response)
            score = parsed_result.get("score", 0)
            why = parsed_result.get("why", "N/A")
            improvements = parsed_result.get("improvements", "N/A")
        except OutputParserException as e:
            print(f"Error parsing Gemini response: {e}")
            return {"error": f"Failed to parse Gemini response: {e}"}, 500

        # 6. Save Analysis Result (Optional but Recommended)
        CVAnalysisResult.objects.create(
            user=user,
            cv_file=cv_file,
            job_description=job_description_text,
            score=score,
            why=why,
            improvements=improvements
        )

        return {
            "score": score,
            "why": why,
            "improvements": improvements
        }, 200

    except Exception as e:
        print(f"An unexpected error occurred during analysis: {e}")
        return {"error": f"An internal server error occurred: {e}"}, 500