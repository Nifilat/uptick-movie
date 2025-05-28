import React from 'react';
import './MovieDetails.css';

const MovieDetails = ({ movie, onClose, genreNames }) => {
  if (!movie) return null;

  return (
    <div className="movie-details-overlay" onClick={onClose}>
      <div className="movie-details-modal" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="movie-details-content">
          <div className="movie-details-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || movie.name}
            />
          </div>
          
          <div className="movie-details-info">
            <h2>{movie.title || movie.name}</h2>
            
            <div className="movie-details-meta">
              <span className="movie-details-rating">{movie.vote_average.toFixed(2)}/10</span>
              <span className="movie-details-year">
                {(movie.release_date || movie.first_air_date)?.split('-')[0]}
              </span>
              <span className="movie-details-type">
                {movie.media_type === 'tv' ? 'TV Show' : 'Movie'}
              </span>
            </div>

            <div className="movie-details-genres">
              {genreNames(movie.genre_ids)}
            </div>

            <div className="movie-details-overview">
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>

            <button className="movie-details-add-to-list-button">
              Add to My List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails; 