import re
from langchain_core.output_parsers.base import BaseOutputParser
from langchain_core.exceptions import OutputParserException

class CVAnalysisOutputParser(BaseOutputParser[dict]):
    """
    Parses the raw text output from Gemini API into a structured dictionary
    containing score, why, and improvements.
    """
    def parse(self, text: str) -> dict:
        """
        Parses the raw text output from Gemini API into a structured dictionary
        containing score, why, and improvements using a string-splitting method.
        """
        try:
            # Normalize the text by removing asterisks and standardizing the keywords
            text = text.replace('**', '').strip()
            
            # Split the text by the keywords
            score_part = re.split(r'Corresponding Score', text, flags=re.IGNORECASE)[1]
            why_part = re.split(r'The why', score_part, flags=re.IGNORECASE)[1]
            improvements_part = re.split(r'Improvements', why_part, flags=re.IGNORECASE)[1]

            # Extract the score
            score_match = re.search(r'(\d+)', score_part)
            score = int(score_match.group(1)) if score_match else 0

            # Extract "the why" and "improvements"
            why = re.split(r'Improvements', why_part, flags=re.IGNORECASE)[0].strip()
            improvements = improvements_part.strip()

            return {
                "score": score,
                "why": why,
                "improvements": improvements
            }
        except IndexError:
            raise OutputParserException(f"Failed to parse text because a keyword was not found. Original text: '{text}'")
        except Exception as e:
            raise OutputParserException(f"An unexpected error occurred during parsing. Error: {e}\nOriginal text: '{text}'")

    @property
    def _type(self) -> str:
        return "cv_analysis_output_parser"