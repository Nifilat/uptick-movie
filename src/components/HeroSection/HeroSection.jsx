import React from "react";
import "./HeroSection.css";

const truncateWords = (text, wordLimit = 30) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

const HeroSection = ({ movie, onViewMore }) => {
  if (!movie) return null;
  const bgImage = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : undefined;

  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <h2 className="hero-title">{movie.title || movie.name}</h2>
          <p className="hero-desc">{truncateWords(movie.overview, 30)}</p>
          <button className="hero-btn" onClick={onViewMore}>
            View More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 