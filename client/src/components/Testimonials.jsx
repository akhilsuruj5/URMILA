import React from 'react';
import { FaLinkedin } from 'react-icons/fa'; // Import LinkedIn icon from react-icons

const Testimonials = () => {
  const testimonials = [
    {
      name: "Aditya",
      role: "Supply Chain Analyst",
      text: "This bootcamp was invaluable for my career. The practical knowledge helped me excel.",
      image: "testimonial.jpg",
      linkedin: "https://www.linkedin.com/in/aditya/",
    },
    {
      name: "Rahul",
      role: "Logistics Manager",
      text: "I'm so grateful for the placement assistance. I landed a great job!",
      image: "testimonial.jpg",
      linkedin: "https://www.linkedin.com/in/rahul/",
    },
    {
      name: "Nidhi",
      role: "Operations Manager",
      text: "The bootcamp gave me the confidence and skills to lead supply chain operations effectively.",
      image: "testimonial.jpg",
      linkedin: "https://www.linkedin.com/in/nidhi/",
    },
  ];

  return (
    <section id="testimonials" className="px-60 pb-32 py-16 bg-gradient-to-r from-green-400 via-green-600 to-green-600 text-whit">
      <div className="container">
        <h2 className="text-white text-3xl pb-10 font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Testimonials
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-evenly text-center bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mb-4"
              />
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <p className="font-bold">{testimonial.name}</p>
              <p className="text-sm text-gray-600">{testimonial.role}</p>
              <a
                href={testimonial.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 mt-4 flex items-center justify-center"
              >
                <FaLinkedin className="w-6 h-6 mr-2 " />
                <span className="underline">Connect on LinkedIn</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
