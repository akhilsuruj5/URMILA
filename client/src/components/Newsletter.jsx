import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Email submitted:", email);
  };

  return (
    <section className="py-16 md:py-36 bg-white">
      <div className="px-6 md:px-20 mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter pb-4 sm:px-6 lg:px-28">Your Weekly Supply Chain Dose:</h2>
        <h2 className="text-2xl sm:text-5xl md:text-6xl font-bold tracking-tighter pb-6 sm:px-6 lg:px-28">Stay Informed, Stay Ahead</h2>
        <p className="text-lg sm:text-xl text-gray-700 pb-10 sm:px-6 lg:px-28 max-w-[900px] mx-auto">
          Get the latest news, insights, and tips on supply chain management delivered straight to your inbox every week.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-4 rounded-md w-full sm:w-auto max-w-[300px] lg:max-w-[400px]"
          />
          <button type="submit" className="bg-black text-white px-6 py-3 rounded-md w-full sm:w-auto max-w-[300px] lg:max-w-[200px]">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
