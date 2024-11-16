import React from "react";
import { CheckCircle, Users } from "lucide-react";

export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            One-to-One Mentorship Program
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Unlock your potential with personalized guidance
          </p>
        </header>

        {/* Program Details and Benefits */}
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 mb-8 md:mb-12">
          <InfoCard title="Program Details" items={programDetails} />
          <InfoCard title="Why Choose Us?" items={whyChooseUs} />
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button onClick={() => alert("Registration form would open here")}>
            Register Now
          </Button>
        </div>

        {/* Community Section */}
        <div className="mt-12 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Join Our Growing Community
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2 text-green-600">
            <Users className="h-6 w-6" />
            <span className="text-lg sm:text-xl font-medium">
              20+ Mentees Empowered
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// InfoCard Component
function InfoCard({ title, items }) {
  return (
    <Card>
      <CardContent>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          {title}
        </h2>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="text-green-500 mr-2 h-5 w-5 mt-1 flex-shrink-0" />
              <span className="text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

// Card Component
function Card({ children }) {
  return (
    <div className="bg-green-50 shadow-lg rounded-lg overflow-hidden border border-green-200">
      {children}
    </div>
  );
}

// CardContent Component
function CardContent({ children }) {
  return <div className="p-4 sm:p-6">{children}</div>;
}

// Button Component
function Button({ children, onClick }) {
  return (
    <button
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full text-base sm:text-lg transition duration-300 ease-in-out transform hover:scale-105"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Static Data
const programDetails = [
  "Personalized 1:1 sessions with expert mentors",
  "Flexible scheduling to fit your needs",
  "Goal-oriented approach for measurable progress",
  "Access to exclusive resources and workshops",
];

const whyChooseUs = [
  "Experienced mentors from top industries",
  "Tailored guidance for your career path",
  "Proven track record of mentee success",
  "Supportive community of like-minded individuals",
];
