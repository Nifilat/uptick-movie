// src/App.jsx
import axios from "axios";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import MovieList from "./components/MovieList/movielist";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/all/week`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
            },
          }
        );
        setMovies(response.data.results);
        setFilteredMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
  
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
            },
          }
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
  
    fetchMovies();
    fetchGenres();
  }, []);

  useEffect(() => {
    let filtered = [...movies];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (movie) =>
          (movie.title || movie.name)
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    // Apply genre filter
    if (selectedGenre) {
      filtered = filtered.filter((movie) =>
        movie.genre_ids.includes(parseInt(selectedGenre))
      );
    }

    // Apply year filter
    if (releaseYear) {
      filtered = filtered.filter((movie) => {
        const releaseDate = movie.release_date || movie.first_air_date;
        return releaseDate && releaseDate.startsWith(releaseYear);
      });
    }

    setFilteredMovies(filtered);
  }, [searchQuery, selectedGenre, releaseYear, movies]);

  const genreNames = (genreIds) => {
    return genreIds
      .map((genreId) => {
        const genre = genres.find((genre) => genre.id === genreId);
        return genre ? genre.name : "";
      })
      .join(", ");
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Movie Explorer</h1>
      </header>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        genres={genres}
        releaseYear={releaseYear}
        onReleaseYearChange={setReleaseYear}
      />
      <MovieList movies={filteredMovies} genreNames={genreNames} onMovieSelect={setSelectedMovie}/>
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          genreNames={genreNames}
        />
      )}
      
    </div>
  );
}
// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// import "./App.css";
// import MovieList from "./components/MovieList/MovieList";
// import SearchBar from "./components/SearchBar/SearchBar";
// import MovieDetails from "./components/MovieDetails/MovieDetails";
// import axios from "axios";

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [genres, setGenres] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedGenre, setSelectedGenre] = useState("");
//   const [releaseYear, setReleaseYear] = useState("");
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         console.log("Fetching movies with params:", {
//           api_key:  import.meta.env.VITE_TMDB_API_KEY,
//           sort_by: 'popularity.desc',
//           page: page,
//           with_genres: selectedGenre,
//           primary_release_year: releaseYear,
//           query: searchQuery,
//         });
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/discover/movie`,
//           {
//             params: {
//               api_key:    import.meta.env.VITE_TMDB_API_KEY,
//               sort_by: 'popularity.desc',
//               page: page,
//               with_genres: selectedGenre,
//               primary_release_year: releaseYear,
//             },
//           }
//         );
//         console.log("Movies response:", response.data);
//         setMovies(response.data.results);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };

//     const fetchGenres = async () => {
//       try {
//         console.log("Fetching genres with key:",    import.meta.env.VITE_TMDB_API_KEY);
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/genre/movie/list`,
//           {
//             params: {
//               api_key:    import.meta.env.VITE_TMDB_API_KEY,
//             },
//           }
//         );
//         console.log("Genres response:", response.data);
//         setGenres(response.data.genres);
//       } catch (error) {
//         console.error("Error fetching genres:", error);
//       }
//     };

//     fetchMovies();
//     fetchGenres();
//   }, [searchQuery, selectedGenre, releaseYear, page]);

//   const genreNames = (genreIds) => {
//     return genreIds
//       .map((genreId) => {
//         const genre = genres.find((genre) => genre.id === genreId);
//         return genre ? genre.name : "";
//       })
//       .join(", ");
//   };

//   return (
//     <div className="app">
//       <header className="app-header">
//         <h1>Movie Explorer</h1>
//       </header>
//       <div className="main-content">
//         <aside className="sidebar">
//           <SearchBar
//             searchQuery={searchQuery}
//             onSearchChange={setSearchQuery}
//             selectedGenre={selectedGenre}
//             onGenreChange={setSelectedGenre}
//             genres={genres}
//             releaseYear={releaseYear}
//             onReleaseYearChange={setReleaseYear}
//           />
//         </aside>
//         <main className="movies-area">
//           <MovieList
//             movies={movies}
//             genreNames={genreNames}
//             onMovieSelect={setSelectedMovie}
//           />
//         </main>
//       </div>
//       {selectedMovie && (
//         <MovieDetails
//           movie={selectedMovie}
//           onClose={() => setSelectedMovie(null)}
//           genreNames={genreNames}
//         />
//       )}
//     </div>
//   );
// }


export default App;
