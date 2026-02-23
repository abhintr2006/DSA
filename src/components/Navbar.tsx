import {
  Home,
  Code2,
  BookOpen,
  ChevronDown,
  User,
  Sun,
  Moon,
} from "lucide-react";

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
  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isNavbarScrolled
          ? "bg-white/10 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}>
      <div className="w-full px-8">
        <div className="flex items-center h-20">
          {/* Left: Branding */}
          <div className="flex-1">
            <h1
              onClick={handleHomeClick}
              className="text-3xl font-bold cursor-pointer hover:opacity-80 transition-opacity ml-4 whitespace-nowrap">
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
          <div className="flex-1 flex items-center justify-end space-x-5">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-orange-500/10 transition-colors">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
