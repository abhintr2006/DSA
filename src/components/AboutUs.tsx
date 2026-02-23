import { Briefcase, GraduationCap, MapPin, Mail, User } from "lucide-react";

interface AboutUsProps {
  activeView: string;
  darkMode: boolean;
}

const AboutUs = ({ activeView, darkMode }: AboutUsProps) => {
  if (activeView !== "about") return null;

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center pb-2 mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
          About Us
        </h2>

        {/* Team Grid - All members together */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {/* Pavan */}
          <div
            className={`p-6 rounded-xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${darkMode ? "bg-white/5 hover:bg-white/10" : "bg-white shadow-xl"}`}>
            <div
              className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-4 border-orange-500 shadow-lg"
              style={{ boxShadow: "0 0 15px rgba(249, 115, 22, 0.3)" }}>
              <img
                src="/screenshots/Pavan.jpeg"
                alt="G Pavan Kumar"
                className="w-full h-full object-cover scale-[1.3]"
              />
            </div>
            <h4 className="text-xl font-bold mb-1">G Pavan Kumar</h4>
            <p className="text-sm font-semibold text-orange-500">
              Frontend & UI/UX Developer
            </p>
          </div>

          {/* Pranav */}
          <div
            className={`p-6 rounded-xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${darkMode ? "bg-white/5 hover:bg-white/10" : "bg-white shadow-xl"}`}>
            <img
              src="/screenshots/profile.svg"
              alt="Pranav"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover object-top border-4 border-orange-500 shadow-lg"
              style={{ boxShadow: "0 0 15px rgba(249, 115, 22, 0.3)" }}
            />
            <h4 className="text-xl font-bold mb-1">Pranav</h4>
            <p className="text-sm font-semibold text-orange-500">
              Core Logic & Logic Integration
            </p>
          </div>

          {/* Rohith */}
          <div
            className={`p-6 rounded-xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${darkMode ? "bg-white/5 hover:bg-white/10" : "bg-white shadow-xl"}`}>
            <img
              src="/screenshots/Rohith.jpeg"
              alt="Rohith"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-orange-500 shadow-lg"
              style={{ boxShadow: "0 0 15px rgba(249, 115, 22, 0.3)" }}
            />
            <h4 className="text-xl font-bold mb-1">Rohith</h4>
            <p className="text-sm font-semibold text-orange-500">
              Team Lead & Project Architect
            </p>
          </div>

          {/* Supeeth */}
          <div
            className={`p-6 rounded-xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${darkMode ? "bg-white/5 hover:bg-white/10" : "bg-white shadow-xl"}`}>
            <div
              className={`w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-orange-500 shadow-lg ${darkMode ? "bg-white/10" : "bg-gray-100"}`}
              style={{ boxShadow: "0 0 15px rgba(249, 115, 22, 0.3)" }}>
              <User size={64} className="text-orange-500 opacity-50" />
            </div>
            <h4 className="text-xl font-bold mb-1">Supeeth</h4>
            <p className="text-sm font-semibold text-orange-500">
              Documentation & Quality Assurance
            </p>
          </div>

          {/* Syed */}
          <div
            className={`p-6 rounded-xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${darkMode ? "bg-white/5 hover:bg-white/10" : "bg-white shadow-xl"}`}>
            <div
              className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-4 border-orange-500 shadow-lg"
              style={{ boxShadow: "0 0 15px rgba(249, 115, 22, 0.3)" }}>
              <img
                src="/screenshots/Syed.jpeg"
                alt="Syed"
                className="w-full h-full object-cover scale-[1.3]"
              />
            </div>
            <h4 className="text-xl font-bold mb-1">Syed</h4>
            <p className="text-sm font-semibold text-orange-500">
              Algorithms & Implementation Specialist
            </p>
          </div>
        </div>

        {/* Shared Info Section */}
        <div
          className={`p-8 rounded-xl ${darkMode ? "bg-white/5" : "bg-white shadow-xl"}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-2">About Our Team</h3>
              <div className="flex items-center space-x-3">
                <Briefcase className="text-orange-500" size={20} />
                <span>
                  Students At K.S School Of Engineering and Management
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <GraduationCap className="text-orange-500" size={20} />
                <span>
                  B.E in CSBS at K.S School Of Engineering and Management
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-orange-500" size={20} />
                <span>Bengaluru, Karnataka</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-orange-500" size={20} />
                <span>pranavarun19@gmail</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-2">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Data Structures",
                  "Algorithms",
                  "Problem Solving",
                  "C++",
                  "Java",
                  "Python",
                  "System Design",
                ].map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full ${
                      darkMode
                        ? "bg-orange-500/20 text-orange-300"
                        : "bg-orange-100 text-orange-800"
                    }`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200/20">
            <h3 className="text-xl font-semibold mb-4">Our Philosophy</h3>
            <p className="opacity-80 leading-relaxed italic">
              "Data structures are not just about storing data; they are about
              organizing information in a way that enables efficient
              problem-solving. Our goal is to make these abstract concepts
              tangible and intuitive."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
