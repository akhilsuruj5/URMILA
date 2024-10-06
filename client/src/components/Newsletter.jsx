import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Email submitted:", email);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Your Weekly Supply Chain Dose: Stay Informed, Stay Ahead</h2>
        <p className="text-gray-600 mb-8">
          Get the latest news, insights, and tips on supply chain management delivered straight to your inbox every week.
        </p>
        <form onSubmit={handleSubmit} className="flex justify-center space-x-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 rounded-md"
          />
          <button type="submit" className="bg-black text-white px-6 py-3 rounded-md">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
