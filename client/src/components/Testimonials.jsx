import React from 'react';
import Slider from 'react-slick'; // Import Slider from react-slick
import { FaLinkedin } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css'; // Import slick-carousel CSS
import 'slick-carousel/slick/slick-theme.css';

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
    {
      name: "Unknown",
      role: "Operations Manager",
      text: "The bootcamp gave me the confidence and skills to lead supply chain operations effectively.",
      image: "testimonial.jpg",
      linkedin: "https://www.linkedin.com/in/nidhi/",
    },
    {
      name: "Aayush",
      role: "Operations Manager",
      text: "The bootcamp gave me the confidence and skills to lead supply chain operations effectively.",
      image: "testimonial.jpg",
      linkedin: "https://www.linkedin.com/in/nidhi/",
    },
    {
      name: "Tarun",
      role: "Operations Manager",
      text: "The bootcamp gave me the confidence and skills to lead supply chain operations effectively.",
      image: "testimonial.jpg",
      linkedin: "https://www.linkedin.com/in/nidhi/",
    },
    // Add more testimonials as needed
  ];

  // Slider settings for react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section id="testimonials" className="px-16 pb-32 py-16 bg-gradient-to-r from-green-400 via-green-600 to-green-600 text-white">
      <div className="container mx-auto">
        <h2 className="text-white text-3xl pb-10 font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Testimonials
        </h2>
        <Slider {...settings} autoplay={true}
  autoplaySpeed={2000}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-4">
              <div
                className="flex flex-col items-center justify-between text-center bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105 h-80" // Fixed height
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <p className="text-gray-700 mb-4 italic flex-grow">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
                <a
                  href={testimonial.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 mt-4 flex items-center justify-center"
                >
                  <FaLinkedin className="w-6 h-6 mr-2" />
                  <span className="underline">Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
