# CVgent: AI-Powered CV Analysis Application

CVgent is a full-stack web application that leverages the power of Google's Gemini API to analyze a user's CV against a given job description. It provides a "corresponding score," a detailed explanation of the score ("the why"), and actionable "improvements" to help users tailor their CVs for job applications.

## Features

*   **User Authentication:** Secure user registration and login system using Django REST Framework and Simple JWT.
*   **Gemini API Integration:** Users can securely store their Gemini API key to power the analysis.
*   **CV and Job Description Analysis:** Upload a PDF CV and paste a job description to receive an in-depth analysis from the Gemini API.
*   **Structured Feedback:** The application parses the Gemini API's response to provide structured feedback, including:
    *   **Corresponding Score:** A numerical score indicating the CV's match with the job description.
    *   **The Why:** A detailed explanation of the score.
    *   **Improvements:** Actionable advice on how to improve the CV for the specific job.
*   **Markdown Rendering:** The "improvements" section is rendered with markdown for a clean and readable user interface.

## Tech Stack

### Backend

*   **Framework:** Django
*   **API:** Django REST Framework
*   **Authentication:** djangorestframework-simplejwt
*   **LLM Integration:** Langchain with Google's Gemini API
*   **PDF Parsing:** pypdf
*   **Environment Variables:** python-dotenv

### Frontend

*   **Framework:** Next.js (with App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **State Management:** React Context API
*   **API Communication:** Fetch API
*   **Markdown Rendering:** react-markdown
*   **Token Management:** js-cookie

## Setup and Installation

### Backend

1.  **Navigate to the `backend` directory:**
    ```bash
    cd backend
    ```
2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```
3.  **Install the required dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Create a `.env` file** in the `backend` directory and add your Django secret key:
    ```
    DJANGO_SECRET_KEY='your-secret-key'
    ```
5.  **Apply database migrations:**
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```
6.  **Run the Django development server:**
    ```bash
    python manage.py runserver
    ```

### Frontend

1.  **Navigate to the `frontend` directory:**
    ```bash
    cd frontend
    ```
2.  **Install the required dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env.local` file** in the `frontend` directory and add the backend API URL, Resend API Key, and the recipient email for contact form submissions:
    ```
    NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8000/api
    RESEND_API_KEY=your_resend_api_key_here
    RESEND_TO_EMAIL=your_recipient_email@example.com
    ```
    *   `RESEND_API_KEY`: Obtain this from your Resend dashboard.
    *   `RESEND_TO_EMAIL`: This is the email address where contact form submissions will be sent.
    *   **Important Note on Email Sending**: For emails to be delivered successfully and not end up in spam, the 'from' address used by Resend must be a domain verified with Resend. In this application, the 'from' address is set to "Contact Form <onbehalfof@resend.dev>" and the 'replyTo' address is set to the sender's email from the contact form. If you wish to use your own verified domain as the 'from' address, you will need to update `frontend/app/api/contact/route.ts` accordingly after verifying your domain with Resend.

4.  **Run the Next.js development server:**
    ```bash
    npm run dev
    ```

## API Endpoints

*   `POST /api/register/`: Register a new user.
*   `POST /api/token/`: Obtain JWT access and refresh tokens.
*   `POST /api/token/refresh/`: Refresh an access token.
*   `GET, POST /api/gemini-key/`: Get or set the user's Gemini API key.
*   `POST /api/analyze-cv/`: Perform the CV analysis.
*   `GET /api/me/`: Get the current user's profile.