import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Aditya",
      role: "Supply Chain Analyst",
      text: "This bootcamp was invaluable for my career. The practical knowledge helped me excel.",
      image: "path-to-image.jpg",
    },
    {
      name: "Rahul",
      role: "Logistics Manager",
      text: "I'm so grateful for the placement assistance. I landed a great job!",
      image: "path-to-image.jpg",
    },
    // Add more testimonials
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Testimonials</h2>
        <div className="flex space-x-6 justify-center">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg w-80">
              <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
              <div className="flex items-center">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4"/>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
