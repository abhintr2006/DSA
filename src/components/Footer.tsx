import {
  Users,
  MessageSquare,
  Github,
  Linkedin,
  Instagram,
  FileText,
  Shield,
  Cookie,
} from "lucide-react";

interface FooterProps {
  darkMode: boolean;
  handleAboutClick: () => void;
}

const Footer = ({ darkMode, handleAboutClick }: FooterProps) => {
  return (
    <footer
      className={`mt-20 ${darkMode ? "bg-gray-900/80" : "bg-gray-800"} text-gray-300`}>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Column 1: Branding */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-white">DSA Study </span>
              <span className="text-orange-500">Hub</span>
            </h3>
            <p className="text-sm leading-relaxed opacity-70">
              The complete platform to master Data Structures and Algorithms.
              Interactive visualizations and practice quizzes to help you
              succeed.
            </p>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={handleAboutClick}
                  className="flex items-center space-x-2 text-sm hover:text-orange-500 transition-colors">
                  <Users size={15} />
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button className="flex items-center space-x-2 text-sm hover:text-orange-500 transition-colors">
                  <MessageSquare size={15} />
                  <span>Contact</span>
                </button>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center space-x-4 mt-8">
              <a
                href="https://github.com/abhintr2006/DSA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-[#24292e] hover:border-[#24292e] hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg">
                <Github size={20} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="group p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg">
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                aria-label="X (Twitter)"
                className="group p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-black hover:border-black hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="group p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:border-transparent hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className={`border-t ${darkMode ? "border-white/10" : "border-gray-700"}`}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm opacity-60">© 2026 DSA Study Hub.</p>
          <div className="flex items-center space-x-6 mt-3 sm:mt-0">
            <button className="text-sm opacity-60 hover:opacity-100 hover:text-orange-500 transition-all flex items-center space-x-1">
              <FileText size={13} />
              <span>Terms</span>
            </button>
            <button className="text-sm opacity-60 hover:opacity-100 hover:text-orange-500 transition-all flex items-center space-x-1">
              <Shield size={13} />
              <span>Privacy</span>
            </button>
            <button className="text-sm opacity-60 hover:opacity-100 hover:text-orange-500 transition-all flex items-center space-x-1">
              <Cookie size={13} />
              <span>Cookies</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
