import React, { useState } from "react";
import { motion } from "framer-motion";
import "./NavigationBar.css";

const getActiveColor = (tab) => {
  switch (tab) {
    case "home":
      return "#3281A8"; // Home color
    case "movies":
      return "#719110"; // Movies color
    case "series":
      return "#B42A89"; // Series color
    case "anime":
      return "#CF6A46"; // Anime color
    default:
      return "transparent"; // Default (e.g., Profile) or inactive
  }
};

const NavigationBar = ({
  active,
  onNavClick,
  searchQuery,
  onSearchChange,
  genres = [],
  selectedGenre = "",
  onGenreChange,
  years = [],
  selectedYear = "",
  onYearChange,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const links = [
    { name: "Profile", key: "profile" },
    { name: "Home", key: "home" },
    { name: "Movies", key: "movies" },
    { name: "Series", key: "series" },
    { name: "Anime", key: "anime" },
  ];

  return (
    <motion.nav
      className="fixed-navbar"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="navbar-inner">
        <div className="navbar-logo">celestial</div>

        {/* Hamburger Icon */}
        <button className="hamburger-icon" onClick={toggleMenu} aria-label="Toggle menu">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>

        <div className={`navbar-content ${isMenuOpen ? 'is-open' : ''}`}>
          <ul className="navbar-links">
            {links.map((link) => (
              <li
                key={link.key}
                className={`rounded-xl px-4 py-2 cursor-pointer font-medium transition-colors duration-300 ${active === link.key ? 'text-white' : 'text-gray-300 hover:bg-[#23232a]'}`}
                onClick={() => {
                  onNavClick(link.key);
                  setIsMenuOpen(false); // Close menu on link click
                }}
                style={
                  active === link.key
                    ? { backgroundColor: getActiveColor(link.key) }
                    : {}
                }
              >
                {link.name}
              </li>
            ))}
          </ul>
          <div className="navbar-search-group">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="navbar-search"
            />
            <select
              className="navbar-filter"
              value={selectedGenre}
              onChange={(e) => onGenreChange(e.target.value)}
            >
              <option value="">Genre</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
            <select
              className="navbar-filter"
              value={selectedYear}
              onChange={(e) => onYearChange(e.target.value)}
            >
              <option value="">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavigationBar;
