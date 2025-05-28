import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, genreNames, onMovieClick }) => {
  return (
    <div
      className="movie-card"
       onClick={() => {
           console.log('Card clicked:', movie);
           onMovieClick(movie);
         }}
        
        >
      <div className="movie-poster" >
      
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name}
        />
        <div className="movie-overlay">
          <div className="movie-rating">
            {movie.vote_average.toFixed(2)}/10
          </div>
          <div className="movie-info">
            <h3>{movie.title || movie.name}</h3>
            <p className="movie-genres">{genreNames(movie.genre_ids)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard; 