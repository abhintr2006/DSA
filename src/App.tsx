import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import ProgramSimulator from "./components/ProgramSimulator";
import Footer from "./components/Footer";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import Cookies from "./components/Cookies";
import { NOTES, PROGRAMS } from "./data/constants";
import { useProgramSimulator } from "./hooks/useProgramSimulator";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [activeView, setActiveView] = useState("home");

  const {
    programOutput,
    userInput,
    setUserInput,
    handleInputSubmit,
    resetProgramState,
  } = useProgramSimulator(activeView);

  // --- Theme & Scroll Effects ---
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    setDarkMode(theme === "dark");

    const handleScroll = () => setIsNavbarScrolled(window.scrollY > 20);
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".programs-dropdown") &&
        !target.closest(".notes-dropdown")
      ) {
        setIsProgramsOpen(false);
        setIsNotesOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const navigate = (view: string) => {
    resetProgramState();
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 grid-bg ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "bg-gray-50 text-gray-900 light-grid"
      }`}>
      <Navbar
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        isProgramsOpen={isProgramsOpen}
        setIsProgramsOpen={setIsProgramsOpen}
        isNotesOpen={isNotesOpen}
        setIsNotesOpen={setIsNotesOpen}
        isNavbarScrolled={isNavbarScrolled}
        handleHomeClick={() => navigate("home")}
        handleAboutClick={() => navigate("about")}
        handleProgramClick={(id) =>
          navigate(id.toLowerCase().replace(/\s/g, ""))
        }
        programs={PROGRAMS}
        notes={NOTES}
      />

      <main>
        <Hero activeView={activeView} />
        <AboutUs activeView={activeView} darkMode={darkMode} />
        <Terms activeView={activeView} darkMode={darkMode} />
        <Privacy activeView={activeView} darkMode={darkMode} />
        <Cookies activeView={activeView} darkMode={darkMode} />

        <ProgramSimulator
          activeView={activeView}
          darkMode={darkMode}
          programOutput={programOutput}
          userInput={userInput}
          setUserInput={setUserInput}
          resetProgramState={resetProgramState}
          handleInputSubmit={handleInputSubmit}
        />
      </main>

      <Footer
        darkMode={darkMode}
        handleAboutClick={() => navigate("about")}
        handleTermsClick={() => navigate("terms")}
        handlePrivacyClick={() => navigate("privacy")}
        handleCookiesClick={() => navigate("cookies")}
      />
    </div>
  );
}

export default App;
