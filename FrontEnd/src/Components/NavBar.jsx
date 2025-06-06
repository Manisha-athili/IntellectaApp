import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Rocket, 
  Menu, 
  X,
  Compass,
  Trophy,
  Code
} from 'lucide-react';
import '../Styles/navbar.css';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) return JSON.parse(savedMode);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // const navItems = [
  //   { name: 'Explore', icon: <Compass size={16} className="nav-link-icon" /> },
  //   { name: 'Leaderboard', icon: <Trophy size={16} className="nav-link-icon" /> },
  //   { name: 'Playground', icon: <Code size={16} className="nav-link-icon" /> }
  // ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : 'navbar-default'}`}>
        <div className="navbar-container">
          <div className="navbar-content">
            {/* Logo */}
            <div className="navbar-logo">
              Intellecta<span className="navbar-logo-accent">Prompt</span>
            </div>

            {/* Desktop Navigation */}
            <div className="desktop-nav">
              {/* <ul className="desktop-nav-list">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a href="#" className="nav-link">
                      {item.icon}
                      {item.name}
                      <span className="nav-link-underline"></span>
                    </a>
                  </li>
                ))}
              </ul> */}

              <div className="desktop-nav-buttons">
                <button
                  onClick={toggleMode}
                  className="theme-toggle-btn"
                  title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                  aria-label="Toggle color scheme"
                >
                  {darkMode ? (
                    <Sun size={18} className="theme-toggle-icon-light" />
                  ) : (
                    <Moon size={18} className="theme-toggle-icon-dark" />
                  )}
                </button>

                {/* <button className="upgrade-btn" title="Upgrade to Pro">
                  <Rocket size={16} className="upgrade-btn-icon" />
                  Upgrade
                </button> */}

                <div className="flex space-x-2">
                  <button className="login-btn text-color-white">Log in</button>
                  <button className="signup-btn">Sign up</button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="mobile-nav-buttons">
              <button
                onClick={toggleMode}
                className="theme-toggle-btn"
                title="Toggle color scheme"
              >
                {darkMode ? (
                  <Sun size={18} className="theme-toggle-icon-light" />
                ) : (
                  <Moon size={18} className="theme-toggle-icon-dark" />
                )}
              </button>
              <button
                onClick={toggleMobileMenu}
                className="mobile-menu-btn"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu animate-fade-in-down">
            <ul className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a href="#" className="mobile-menu-item">
                    {item.icon}
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-2 space-y-3">
              {/* <button className="upgrade-btn w-full justify-center">
                <Rocket size={16} className="upgrade-btn-icon" />
                Upgrade
              </button> */}

              <div className="flex space-x-2">
                <button className="login-btn w-full">Log in</button>
                <button className="signup-btn w-full">Sign up</button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Add some spacing when mobile menu is open */}
      {mobileMenuOpen && <div className="mobile-menu-spacer"></div>}
    </>
  );
}