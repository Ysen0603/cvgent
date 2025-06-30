from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.schema import HumanMessage

def get_gemini_response(api_key: str, prompt_text: str) -> str:
    """
    Sends a prompt to the Gemini API using Langchain and returns the response.
    """
    try:
        llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash-lite-preview-06-17", google_api_key=api_key)
        messages = [HumanMessage(content=prompt_text)]
        response = llm.invoke(messages)
        return response.content
    except Exception as e:
        print(f"Error getting Gemini response: {e}")
        return None
