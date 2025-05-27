// src/components/movielist.jsx
import React from "react";
import "./MovieList.css";

const MovieList = ({ movies, genreNames }) => {
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
        <div key={movie.id} className="movie-card">
          <div className="movie-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || movie.name}
            />
          </div>
          <div className="movie-info">
            <h2>{movie.title || movie.name}</h2>
            <p className="release-date">
              Release Date: {movie.release_date || movie.first_air_date}
            </p>
            <p className="genres">Genres: {genreNames(movie.genre_ids)}</p>
            <p className="overview">{movie.overview}</p>
            <div className="movie-meta">
              <span className="rating">Rating: {movie.vote_average}/10</span>
              <span className="type">{movie.media_type === 'tv' ? 'TV Show' : 'Movie'}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// import React from "react";

// const MovieList = (props) => {
//   return (
//     <>
//       {props.movies.map((movie, index) => (
//         <div className="image-container d-flex justify-content-start m-3">
//           <img
//             src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
//             alt="movie"
//           ></img>
//         </div>
//       ))}
//     </>
//   );
// };

export default MovieList;
