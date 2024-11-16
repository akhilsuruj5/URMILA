import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const AboutUs = () => {
  const companyName =
    "Unified Resource Management Institute for Logistics and Analytics (URMILA)";
  return (
    <div className="min-h-screen bg-gradient-to-b from-white-50 to-white pb-16 pt-6">
      <main className="container mx-auto px-4 py-8 sm:py-12">
        {/* Company Name */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 max-w-3xl mx-auto">
          {companyName}
        </h1>

        {/* About Section */}
        <div className="bg-white rounded-lg max-w-6xl mx-auto p-6 sm:p-8">
          <div className="md:flex">
            <div className="">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                About Our Company
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                In 2018, we started bridging the gap between Academia and
                Logistics Industry expectations in terms of talent quality after
                realizing talent gaps. We started grooming fresh college
                graduates through mentorships and various internship programs.
                Our mission is to groom college graduates through mentorships
                and support them in getting live projects/internships for
                hands-on experience. We believe that our initiatives make
                college graduates employable and support the world in getting
                future leaders in the Logistics industry.
              </p>
            </div>
          </div>
        </div>

        {/* Our Team Section */}
        <div className="mt-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
            Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Akhilesh Kushawaha", role: "Mentor- SCM" },
              { name: "Shobhit Srivastava", role: "Mentor- Communication" },
              { name: "Neeraj Gangwal", role: "Mentor- 3D Modelling" },
              { name: "Komal Balyan", role: "Mentor- Automation & Consulting" },
              { name: "Akhilesh Pratap Singh", role: "Mentor- Product Management" },
              { name: "Heena Jaisawal", role: "Mentor- Digital Marketing" },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 mb-4 overflow-hidden rounded-full">
                  <img
                    src={`/testimonial.jpg?height=96&width=96`}
                    alt={`${member.name} Image`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Connect With Us */}
        <div className="mt-12 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
            Connect With Us
          </h2>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.linkedin.com/company/1urmila"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-pink-500 transition-colors"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-400 transition-colors"
            >
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
