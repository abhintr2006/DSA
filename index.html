import React, { useState, useEffect } from 'react';
import { Moon, Sun, ChevronDown, Linkedin, Instagram, Twitter, Facebook } from 'lucide-react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  return (
    <div className={isDarkMode ? 'dark bg-gray-900 text-white' : 'light bg-gray-100 text-gray-900'}>
      <nav className="flex justify-between items-center p-5 bg-opacity-20 backdrop-blur-lg fixed w-full top-0">
        <h1 className="text-2xl font-bold text-orange-500">DSA Learning Hub</h1>
        <ul className="flex space-x-4">
          <li><a href="#home" className="hover:text-orange-500">Home</a></li>
          <li><a href="#notes" className="hover:text-orange-500">Study Notes</a></li>
          <li className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-1 hover:text-orange-500">
              Programs & Outputs <ChevronDown size={16} />
            </button>
            {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 bg-white dark:bg-gray-800 shadow-md rounded-md p-2">
                {[...Array(12).keys()].map(i => (
                  <li key={i}><a href={`program${i+1}.html`} className="block px-4 py-2 hover:bg-orange-500">Program {i+1}</a></li>
                ))}
              </ul>
            )}
          </li>
          <li><a href="code-compiler.html" className="hover:text-orange-500">Code Compiler</a></li>
        </ul>
        <button onClick={toggleTheme} className="p-2 rounded bg-gray-700 hover:bg-orange-500">
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>
      
      <section id="home" className="text-center py-32">
        <h2 className="text-4xl font-bold">Master Data Structures & Algorithms</h2>
        <p className="text-lg text-gray-300">Explore comprehensive study materials and coding programs to ace DSA.</p>
        <a href="#notes" className="mt-4 inline-block px-6 py-3 bg-orange-500 text-white rounded-lg">Get Started</a>
      </section>
      
      <footer className="text-center p-5 bg-opacity-20 backdrop-blur-lg">
        <p>&copy; 2025 DSA Learning Hub</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://linkedin.com" target="_blank" className="p-2 bg-gray-700 rounded-full hover:bg-orange-500"><Linkedin size={20} /></a>
          <a href="https://instagram.com" target="_blank" className="p-2 bg-gray-700 rounded-full hover:bg-orange-500"><Instagram size={20} /></a>
          <a href="https://twitter.com" target="_blank" className="p-2 bg-gray-700 rounded-full hover:bg-orange-500"><Twitter size={20} /></a>
          <a href="https://facebook.com" target="_blank" className="p-2 bg-gray-700 rounded-full hover:bg-orange-500"><Facebook size={20} /></a>
        </div>
      </footer>
    </div>
  );
}

export default App;
