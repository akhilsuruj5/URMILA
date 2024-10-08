import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Email submitted:", email);
  };

  return (
    <section className="py-36 bg-white">
      <div className="px-20 mx-auto text-center">
        <h2 className="px-28 pb-6 font-bold tracking-tighter text-6xl">Your Weekly Supply Chain Dose:</h2>
        <h2 className="px-28 pb-16  font-bold tracking-tighter text-6xl">Stay Informed, Stay Ahead</h2>
        <p className="mx-auto pb-14 text-gray-700 max-w-[900px] md:text-xl">
          Get the latest news, insights, and tips on supply chain management delivered straight to your inbox every week.
        </p>
        <form onSubmit={handleSubmit} className="flex justify-center space-x-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-4 rounded-md"
          />
          <button type="submit" className="bg-black text-white px-6 py-3 rounded-md">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
