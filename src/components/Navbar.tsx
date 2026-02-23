import {
  Home,
  Code2,
  BookOpen,
  ChevronDown,
  User,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
  isProgramsOpen: boolean;
  setIsProgramsOpen: (open: boolean) => void;
  isNotesOpen: boolean;
  setIsNotesOpen: (open: boolean) => void;
  isNavbarScrolled: boolean;
  handleHomeClick: () => void;
  handleAboutClick: () => void;
  handleProgramClick: (programId: string) => void;
  programs: { name: string }[];
  notes: { name: string; file: string }[];
}

const Navbar = ({
  darkMode,
  toggleTheme,
  isProgramsOpen,
  setIsProgramsOpen,
  isNotesOpen,
  setIsNotesOpen,
  isNavbarScrolled,
  handleHomeClick,
  handleAboutClick,
  handleProgramClick,
  programs,
  notes,
}: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLinkClick = (action: () => void) => {
    action();
    closeMobileMenu();
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isNavbarScrolled || isMobileMenuOpen
          ? `${darkMode ? "bg-gray-900/95" : "bg-white/95"} backdrop-blur-lg shadow-lg`
          : "bg-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Branding */}
          <div className="flex-shrink-0">
            <h1
              onClick={() => handleLinkClick(handleHomeClick)}
              className="text-xl md:text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap">
              <span className={darkMode ? "text-white" : "text-gray-900"}>
                DSA Study{" "}
              </span>
              <span className="text-orange-500">Hub</span>
            </h1>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden lg:flex flex-1 justify-center items-center space-x-10 text-lg font-medium">
            <button
              onClick={handleHomeClick}
              className="flex items-center space-x-2 hover:text-orange-500 transition-colors">
              <Home size={20} />
              <span>Home</span>
            </button>

            <div className="relative programs-dropdown">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProgramsOpen(!isProgramsOpen);
                  setIsNotesOpen(false);
                }}
                className="flex items-center space-x-2 hover:text-orange-500 transition-colors">
                <Code2 size={20} />
                <span>Programs</span>
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${isProgramsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isProgramsOpen && (
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-xl shadow-2xl py-2 border ${darkMode ? "bg-gray-900/90 backdrop-blur-xl border-white/10" : "bg-white border-gray-200"}`}>
                  {programs.map((program) => (
                    <button
                      key={program.name}
                      className="w-full text-left px-4 py-2.5 hover:bg-orange-500/10 hover:text-orange-500 transition-colors"
                      onClick={() => {
                        handleProgramClick(program.name);
                        setIsProgramsOpen(false);
                      }}>
                      {program.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative notes-dropdown">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsNotesOpen(!isNotesOpen);
                  setIsProgramsOpen(false);
                }}
                className="flex items-center space-x-2 hover:text-orange-500 transition-colors">
                <BookOpen size={20} />
                <span>Notes</span>
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${isNotesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isNotesOpen && (
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-xl shadow-2xl py-2 border ${darkMode ? "bg-gray-900/90 backdrop-blur-xl border-white/10" : "bg-white border-gray-200"}`}>
                  {notes.map((note) => (
                    <a
                      key={note.file}
                      href={`/notes/${note.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2.5 hover:bg-orange-500/10 hover:text-orange-500 transition-colors"
                      onClick={() => setIsNotesOpen(false)}>
                      {note.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleAboutClick}
              className="flex items-center space-x-2 hover:text-orange-500 transition-colors whitespace-nowrap">
              <User size={20} />
              <span>About Us</span>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2 md:space-x-5">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full hover:bg-orange-500/10 transition-colors ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-orange-500/10 transition-colors">
              {isMobileMenuOpen ? (
                <X size={24} className="text-orange-500" />
              ) : (
                <Menu
                  size={24}
                  className={darkMode ? "text-gray-300" : "text-gray-600"}
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-6 pt-2 animate-fade-in border-t border-white/5 max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleLinkClick(handleHomeClick)}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-orange-500/10 rounded-lg transition-colors">
                <Home size={20} className="text-orange-500" />
                <span className="font-medium">Home</span>
              </button>

              <div className="px-4 py-2 border-b border-white/5">
                <div className="flex items-center space-x-3 text-orange-500 mb-3">
                  <Code2 size={20} />
                  <span className="font-medium uppercase tracking-wider text-xs opacity-70">
                    Programs
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 pl-8">
                  {programs.map((program) => (
                    <button
                      key={program.name}
                      className="text-left py-2 opacity-80 hover:opacity-100 hover:text-orange-500 text-sm"
                      onClick={() =>
                        handleLinkClick(() => handleProgramClick(program.name))
                      }>
                      {program.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-4 py-2 border-b border-white/5">
                <div className="flex items-center space-x-3 text-orange-500 mb-3">
                  <BookOpen size={20} />
                  <span className="font-medium uppercase tracking-wider text-xs opacity-70">
                    Notes
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2 pl-8">
                  {notes.map((note) => (
                    <a
                      key={note.file}
                      href={`/notes/${note.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block py-2 opacity-80 hover:opacity-100 hover:text-orange-500 text-sm"
                      onClick={closeMobileMenu}>
                      {note.name}
                    </a>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleLinkClick(handleAboutClick)}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-orange-500/10 rounded-lg transition-colors">
                <User size={20} className="text-orange-500" />
                <span className="font-medium">About Us</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
