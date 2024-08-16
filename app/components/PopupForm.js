"use client";
import { useState } from 'react';

export default function PopupForm({ isOpen, onClose }) {
  const [userEmail, setUserEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [jsonFile, setJsonFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  if (!isOpen) return null;

  const handleFileChange = (event) => {
    setJsonFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setEmailStatus(null);
    setProgress(0);

    if (!jsonFile) {
      setError('Please upload a JSON file.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', jsonFile);
    formData.append('userEmail', userEmail);
    formData.append('subject', subject);
    formData.append('message', message);

    try {
      const response = await fetch('/api/send_emails', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        const { emailStatus } = data;
        if (emailStatus) {
          const totalEmails = emailStatus.total || 0;
          const sentEmails = emailStatus.sent || 0;
          const details = emailStatus.details || [];

          setEmailStatus(emailStatus);
          setProgress(totalEmails > 0 ? Math.round((sentEmails / totalEmails) * 100) : 0);

          // If all emails are sent, close the popup after a slight delay
          if (sentEmails === totalEmails) {
            setTimeout(() => {
              alert('All emails have been successfully sent!');
              resetForm();  // Clear form and status
              onClose();  // Close the popup
            }, 500);  // Delay to allow the alert to show
          }
        } else {
          setError('Invalid response format from the server.');
        }
      } else {
        setError('Failed to send emails: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      setError('An error occurred while sending emails: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form fields and status
  const resetForm = () => {
    setUserEmail('');
    setSubject('');
    setMessage('');
    setJsonFile(null);
    setEmailStatus(null);
    setProgress(0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Send Emails</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-600">Your Email</label>
            <input
              type="email"
              id="userEmail"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-600">Subject</label>
            <input
              type="text"
              id="subject"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-600">Message</label>
            <textarea
              id="message"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="emailJSON" className="block text-sm font-medium text-gray-600">Upload JSON File</label>
            <input
              type="file"
              accept=".json"
              className="mt-1 block w-full text-gray-700"
              onChange={handleFileChange}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 ${isLoading ? 'bg-gray-400' : 'bg-blue-600'} text-white font-semibold rounded-lg shadow-md hover:bg-blue-700`}
          >
            {isLoading ? 'Sending...' : 'Send Emails'}
          </button>
          <button
            type="button"
            onClick={() => { resetForm(); onClose(); }}
            className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 mt-4"
          >
            Close
          </button>
        </form>

        {/* Displaying error messages */}
        {error && <p className="mt-4 text-red-600">{error}</p>}

        {/* Displaying the progress of emails */}
        {emailStatus && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700">Email Sending Progress:</h3>
            <p className="mt-2 text-gray-800">
              Sent {emailStatus.sent} out of {emailStatus.total} emails.
            </p>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between text-xs font-semibold text-blue-600 uppercase">
                <span>{progress}%</span>
              </div>
              <div className="flex h-2 mb-4">
                <div className="w-full bg-gray-200">
                  <div className="bg-blue-600 h-full text-center text-xs text-white" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
