import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { TbBrandX } from "react-icons/tb";
import { useEffect, useState } from "react";

const AboutUs = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const companyName =
    "Unified Resource Management Institute for Logistics and Analytics (URMILA)";


    useEffect(() => {
      // Fetch team members from the database
      const fetchTeamMembers = async () => {
        try {
          const response = await fetch("https://urmila-webservice.onrender.com/team");
          const data = await response.json();
          setTeamMembers(data);
        } catch (error) {
          console.error("Error fetching team members:", error);
        }
      };
  
      fetchTeamMembers();
    }, []);



  return (
    <div className="min-h-screen bg-gradient-to-b from-white-50 to-white pb-16 pt-6">
      <main className="container mx-auto px-4 py-8 sm:py-12">
        {/* Company Name */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 max-w-3xl mx-auto">
          {companyName}
        </h1>

        {/* About Us Section */}
        <div className="bg-white rounded-lg max-w-6xl mx-auto p-6 sm:p-8">
          <div className="md:flex">
            <div className="w-full">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                About Our Company
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-justify">
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
          <div className="space-y-8">
            {/* First Line - Centered */}
            <div className="flex justify-center">
              <div className="bg-white rounded-lg shadow-md p-6 max-w-sm flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-4 overflow-hidden rounded-full">
                  <img
                    src={`/1516779222384.jfif?height=96&width=96`}
                    alt="Neeraj Gangwal Image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <a
                  href="https://www.linkedin.com/in/neerajgangwal2006/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-lg font-semibold text-gray-800 hover:underline"
                >
                  Neeraj Gangwal
                </a>
                <p className="text-sm text-gray-600">Organizer & Coordinator</p>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  Neeraj Gangwal is an IIT Kanpur alumni who has more than 10
                  years of experience in building training and workshop
                  ecosystems and managing them.
                </p>
              </div>
            </div>
            {/* [
                {
                  name: "Akhilesh Kushawaha",
                  role: "Mentor- SCM",
                  description:
                    "Akhilesh Kushawaha is an IIT Kanpur alumni who has around 10 years of experience in the supply chain domain and has a proven track record of student and early career professionals mentorship.",
                  linkedin: "https://www.linkedin.com/in/akhilesh-kushawaha-79b73980/",
                  image: "1728667575676.jfif",
                },
                {
                  name: "Shobhit Srivastava",
                  role: "Mentor- Communication",
                  description:
                    "Shobhit Srivastava has more than 15 years of experience in the supply chain domain and has a proven track record in customer communication and business development.",
                  linkedin: "https://www.linkedin.com/in/shobhit-srivastava-67813655/",
                  image: "1533738524520.jfif",
                },
                {
                  name: "Heena Jaisawal",
                  role: "Mentor- Digital Marketing",
                  description:
                    "Heena Jaisawal has more than 5 years of experience in the digital marketing domain and has a proven track record in digital marketing and strategy.",
                  linkedin: "",
                  image: "testimonial.jpg",
                },
              ] */}
            {/* Second Line Onwards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 mb-4 overflow-hidden rounded-full">
                    <img
                      // src={`/${member.image}?height=96&width=96`}
                      src={`${member.image}`}
                      alt={`${member.name} Image`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg font-semibold text-gray-800 hover:underline"
                    >
                      {member.name}
                    </a>
                  ) : (
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                      {member.name}
                    </h3>
                  )}
                  <p className="text-sm text-gray-600">{member.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed mt-2">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Connect with us */}
        <div className="mt-12 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
            Connect With Us
          </h2>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.linkedin.com/company/1urmila"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="#"
              className="text-pink-500 transition-colors"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="#"
              className="text-gray-800 transition-colors"
            >
              <TbBrandX size={24} />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
