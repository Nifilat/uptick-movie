import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";

const MovieList = ({ movies, genreNames, onMovieSelect }) => {
  if (!movies.length) {
    return (
      <div className="no-movies-message">
        <h3>No movies found matching your criteria.</h3>
        <p>Try adjusting your search or filter options.</p>
      </div>
    );
  }
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          genreNames={genreNames}
          onMovieClick={onMovieSelect}
        />
      ))}
    </div>
  );
};

export default MovieList;
