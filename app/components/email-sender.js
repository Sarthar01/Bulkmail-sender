"use client";
import { useState } from 'react';
import PopupForm from './PopupForm';

export default function MainContent() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    console.log(`Form ${isFormOpen ? 'closed' : 'opened'}`);
    setIsFormOpen(!isFormOpen);
  };

  return (
    <main className="flex-grow flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to JobSeeker Pro!
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          🚀 Looking for your dream job or just a little career inspiration? You’ve come to the right place! 🎯
        </p>
        <p className="text-lg text-gray-700 mb-6">
          We know job hunting can sometimes feel like you're searching for a needle in a haystack, or maybe even a unicorn in a field of horses. But don’t worry, we’ve got your back! Our tool is designed to turn that daunting task into a delightful adventure. 
          <br /><br />
          Whether you're a seasoned professional or a fresh graduate, our platform is here to help you navigate the wild world of job applications. And if you’re feeling lucky, we might just sprinkle some magic into your job search with a little help from our email sending feature. 💌
        </p>
        <p className="text-lg text-gray-700 mb-6">
          So, why wait? Click the button below to start sending those job application emails and take a step closer to landing your dream job. We promise it’s easier than finding that elusive unicorn!
        </p>
        <button
          onClick={toggleForm}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
        >
          Start Sending Emails to Your Future Employers!
        </button>
      </div>
      <PopupForm isOpen={isFormOpen} onClose={toggleForm} />
    </main>
  );
}
