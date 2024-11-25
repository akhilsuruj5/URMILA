import React from "react";
import Slider from "react-slick"; // Import Slider from react-slick
import { FaLinkedin } from "react-icons/fa";
import "slick-carousel/slick/slick.css"; // Import slick-carousel CSS
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Mayuresh Jahagirdar",
      text: (
        <>
          I had the privilege of being mentored by Akhilesh Kushawaha under the
          umbrella of{" "}
          <a
            href="https://www.linkedin.com/company/1urmila/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500"
          >
            URMILA
          </a>
          , an expert in warehouse solutions, warehouse design, and automation
          solutions, and the experience under his mentorship has been invaluable
          for my career development. Akhilesh Kushawaha not only taught me the
          technical basics but also demonstrated the strategic thinking required
          to design and optimize efficient, future-ready warehouses.
        </>
      ),
      image: "1679827921534.jfif",
      linkedin: "https://www.linkedin.com/in/mayuresh-jahagirdar-78368762/",
    },
    {
      name: "Sanjeev Maurya",
      text: (
        <>
          I am incredibly grateful to have had the opportunity to learn from
          Akhilesh Kushawaha under the umbrella of{" "}
          <a
            href="https://www.linkedin.com/company/1urmila/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500"
          >
            URMILA
          </a>{" "}
          with such depth in warehouse operations and logistics solutions. His
          guidance has been pivotal in developing my understanding of both the
          fundamentals and practical aspects of these fields, and his teaching
          style has left a lasting impact on my approach to logistics.
        </>
      ),
      image: "1692017549395.jfif",
      linkedin: "https://www.linkedin.com/in/sanjeev-maurya-b73b517a/",
    },
    {
      name: "Ankita Kushwaha",
      text: (
        <>
          I am incredibly grateful for the mentorship I received from Akhilesh
          Kushawaha under the umbrella of{" "}
          <a
            href="https://www.linkedin.com/company/1urmila/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500"
          >
            URMILA
          </a>
          , who not only taught me the fundamentals of warehouse solution design
          but also supported me in securing my first job in the field. Their
          expertise and dedication have been instrumental in shaping my career
          journey and providing me with the confidence and knowledge I needed to
          succeed.{" "}
        </>
      ),
      image: "testimonial.jpg",
      linkedin: "https://www.linkedin.com/in/ankita-kushwaha-349b55329/",
    },
  ];

  // Slider settings for react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
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
    <section
      id="testimonials"
      className="px-16 pb-32 py-16 bg-gradient-to-r from-green-400 via-green-600 to-green-600 text-white"
    >
      <div className="container mx-auto">
        <h2 className="text-white text-3xl pb-10 font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Testimonials
        </h2>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-4">
              <div
                className="flex flex-col items-center justify-between text-center bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105 min-h-[350px] max-h-[350px] flex-grow"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <p
                  className="text-gray-700 italic text-justify mb-4 max-h-[120px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
                >
                  {testimonial.text}
                </p>
                <div className="mt-auto">
                  <a
                    href={testimonial.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-gray-800 underline"
                  >
                    {testimonial.name}
                  </a>
                  <p className="text-sm text-gray-600 mb-2">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
