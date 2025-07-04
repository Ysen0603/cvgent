"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getGeminiApiKey, setGeminiApiKey } from '../../lib/api/gemini';
import { updateUserProfile } from '../../lib/api/auth';
import { uploadCv, deleteCv } from '../../lib/api/userCv'; // Removed getUserCv
import PdfPreview from '../../components/PdfPreview';

const SettingsPage: React.FC = () => {
  const { user, fetchCurrentUser: refetchUser, updateUserCvProfile } = useAuth();
  console.log('User from AuthContext (initial/re-render):', user);
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [geminiApiKey, setGeminiApiKeyInput] = useState('');
  const [currentGeminiApiKey, setCurrentGeminiApiKey] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvUploadMessage, setCvUploadMessage] = useState('');
  const [cvUploadError, setCvUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Initial fetch for Gemini API Key and user data
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      // Fetch Gemini API Key
      const geminiResponse = await getGeminiApiKey();
      if (geminiResponse && geminiResponse.api_key) {
        setCurrentGeminiApiKey(geminiResponse.api_key);
      } else {
        setCurrentGeminiApiKey(null);
      }
      // Ensure user data is fetched on initial load
      await refetchUser();
      setLoading(false);
    };
    fetchInitialData();
  }, []); // Empty dependency array means it runs once on mount

  // Update local states when user object from context changes
  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
    }
  }, [user]);

  // Removed the previous useEffect that depended on user and fetched all data
  // Now, initial data is fetched once, and user data updates via AuthContext

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    let success = true;
    let updated = false;

    // Prepare data for user profile update (only send changed and non-empty fields)
    const profileData: { username?: string; email?: string } = {};
    if (username && username !== user?.username) {
      profileData.username = username;
    }
    if (email && email !== user?.email) {
      profileData.email = email;
    }

    // Update User Profile if any field changed
    if (Object.keys(profileData).length > 0) {
      const userUpdateSuccess = await updateUserProfile(profileData);
      if (userUpdateSuccess) {
        setMessage('Account information updated successfully!');
        await refetchUser();
        updated = true;
      } else {
        setError('Failed to update account information.');
        success = false;
      }
    }

    // Update Gemini API Key if filled
    if (geminiApiKey) {
      const geminiKeySuccess = await setGeminiApiKey(geminiApiKey);
      if (geminiKeySuccess) {
        setMessage(prev => prev + (prev ? ' ' : '') + 'Gemini API Key updated successfully!');
        setCurrentGeminiApiKey(geminiApiKey);
        setGeminiApiKeyInput('');
        updated = true;
      } else {
        setError(prev => prev + (prev ? ' ' : '') + 'Failed to update Gemini API Key.');
        success = false;
      }
    }

    // If nothing was updated
    if (!updated && success) {
      setMessage('Nothing to update.');
    }
  };

 const handleCvUpload = async (fileToUpload: File) => {
   setCvUploadMessage('');
   setCvUploadError('');
   setLoading(true);
   try {
     await uploadCv(fileToUpload);
     const updatedProfile = await uploadCv(fileToUpload); // Assuming uploadCv returns the updated profile
     setCvUploadMessage('CV uploaded successfully!');
     setCvFile(null); // Clear selected file
     if (fileInputRef.current) {
       fileInputRef.current.value = ''; // Clear file input
     }
     updateUserCvProfile(updatedProfile); // Directly update context
   } catch (err) {
     console.error('Error uploading CV:', err);
     setCvUploadError('Failed to upload CV. Please try again.');
   } finally {
     setLoading(false);
   }
 };

 const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   if (e.target.files && e.target.files[0]) {
     const file = e.target.files[0];
     setCvFile(file); // Set the file for preview if needed
     handleCvUpload(file); // Immediately trigger upload
   } else {
     setCvFile(null);
   }
 };

 const handleCvDelete = async () => {
   setCvUploadMessage('');
   setCvUploadError('');
   setLoading(true);
   // Optimistically remove the CV from the UI before deleting
   updateUserCvProfile({ ...user?.userprofile, cv_url: null, cv_file: null });
   try {
     await deleteCv(); // This now returns null on success
     setCvUploadMessage('CV deleted successfully!');
     updateUserCvProfile(null); // Directly update context to clear CV
   } catch (err) {
     console.error('Error deleting CV:', err);
     setCvUploadError('Failed to delete CV. Please try again.');
     // Optionally restore the CV if deletion failed
     await refetchUser();
   } finally {
     setLoading(false);
   }
 };

 if (loading) {
   return <div className="text-center py-8">Loading settings...</div>;
 }

  return (
    <main className="flex flex-1 justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h2>
          <p className="mt-2 text-sm text-gray-600">Manage your account information and API key.</p>
        </div>
        <form className="mt-8 space-y-6 bg-white p-6 sm:p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
          {message && <p className="text-green-600 text-center mb-4">{message}</p>}
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">Account Information</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 pb-1.5" htmlFor="username">Username</label>
                <input
                  autoComplete="username"
                  className="form-input block w-full rounded-lg border-gray-300 shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] sm:text-sm py-3 px-4 placeholder-gray-400"
                  id="username"
                  name="username"
                  placeholder="e.g. JohnDoe"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 pb-1.5" htmlFor="email">Email address</label>
                <input
                  autoComplete="email"
                  className="form-input block w-full rounded-lg border-gray-300 shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] sm:text-sm py-3 px-4 placeholder-gray-400"
                  id="email"
                  name="email"
                  placeholder="e.g. john.doe@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <p className="mt-1 text-xs text-gray-500">Leave blank if you don't want to change it.</p>
              </div>
            </div>
          </section>
          <section className="pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">API Configuration</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 pb-1.5" htmlFor="api-key">Gemini API Key</label>
              <input
                className="form-input block w-full rounded-lg border-gray-300 shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] sm:text-sm py-3 px-4 placeholder-gray-400"
                id="api-key"
                name="api-key"
                placeholder="Enter your Gemini API Key"
                type="password"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKeyInput(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">Your API key is stored securely and used solely for CV analysis.</p>
              {
                currentGeminiApiKey ? (
                  <p className="mt-1 text-xs text-green-800 font-bold">Current API Key is set. (For security, full key is not displayed)</p>
                ) : (
                  <p className="mt-1 text-xs text-red-500 font-bold">No Gemini API Key set.</p>
                )
              }
            </div>
            <div className="pt-6 flex justify-end">
            <button
              type="submit"
              className="group relative flex justify-center rounded-md border border-transparent bg-[var(--primary-color)] hover:bg-[var(--text-primary)] cursor-pointer py-2.5 px-6 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 transition-colors"
            >
              Update Settings
            </button>
          </div>
          </section>

          <section className="pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">CV Management</h3>
            <div className="space-y-4">
              {cvUploadMessage && <p className="text-green-600 text-center">{cvUploadMessage}</p>}
              {cvUploadError && <p className="text-red-600 text-center">{cvUploadError}</p>}

              {user?.userprofile?.cv_url ? (
                <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900">Uploaded CV:</p>
                    <button
                      type="button"
                      onClick={handleCvDelete}
                      className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Remove CV
                    </button>
                  </div>
                  <PdfPreview url={user.userprofile.cv_url} />
                </div>
              ) : (
                <p className="text-sm font-semibold text-red-500">No CV currently uploaded.</p>
              )}

              <div className="mt-4">
                <label htmlFor="cv-upload" className="block text-sm font-medium text-gray-700 pb-1.5">Upload your CV (PDF only)</label>
                <input
                  id="cv-upload"
                  name="cv-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleCvFileChange}
                  ref={fileInputRef}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[var(--primary-color)] file:text-white
                    hover:file:bg-[var(--text-primary)]
                    cursor-pointer
                    "
                />
              </div>
            </div>
          </section>

          
        </form>
      </div>
    </main>
  );
};

export default SettingsPage;