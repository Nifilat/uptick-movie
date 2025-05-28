import React from "react";
import "./HeroSection.css";

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
          <p className="hero-desc">{movie.overview}</p>
          <button className="hero-btn" onClick={onViewMore}>
            View More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 