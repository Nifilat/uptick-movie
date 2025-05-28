import React from "react";
import { motion } from "framer-motion";
import "./NavigationBar.css";

const getActiveColor = (tab) => {
  switch (tab) {
    case "home":
      return "#3281A8";
    case "movies":
      return "#719110";
    case "series":
      return "#B42A89";
    case "anime":
      return "#CF6A46";
    default:
      return "#28282f";
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
        <ul className="navbar-links">
          {links.map((link) => (
            <li
              key={link.key}
              className={active === link.key ? "active" : ""}
              onClick={() => onNavClick(link.key)}
              style={
                active === link.key
                  ? { background: getActiveColor(link.key), color: "#fff" }
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
    </motion.nav>
  );
};

export default NavigationBar;
