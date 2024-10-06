import React from 'react';

const WhyThisCourse = () => {
  const benefits = [
    { title: "Mentorship", description: "Benefit from one-on-one guidance from industry professionals." },
    { title: "Placement Assistance", description: "Get placement assistance to land a great job." },
    { title: "Flexible Learning", description: "Learn at your own pace with flexible schedules." },
    // Add more benefits as needed
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Why this course?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-700">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyThisCourse;
