// src/App.jsx
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import MovieList from "./components/MovieList/movielist";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=4c3ee0a8ad3c867a7badec329ce08788`
      );
      const data = await response.json();
      setMovies(data.results);
      setFilteredMovies(data.results);
    };

    const fetchGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=4c3ee0a8ad3c867a7badec329ce08788`
      );
      const data = await response.json();
      setGenres(data.genres);
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
      <MovieList movies={filteredMovies} genreNames={genreNames} />
    </div>
  );
}

// function App() {
//   const [movies, setMovies] = useState([
//     // {
//     //   adult: false,
//     //   backdrop_path: "/zWDMQX0sPaW2u0N2pJaYA8bVVaJ.jpg",
//     //   id: 631842,
//     //   title: "Knock at the Cabin",
//     //   original_language: "en",
//     //   original_title: "Knock at the Cabin",
//     //   overview:
//     //     "While vacationing at a remote cabin, a young girl and her two fathers are taken hostage by four armed strangers who demand that the family make an unthinkable choice to avert the apocalypse. With limited access to the outside world, the family must decide what they believe before all is lost.",
//     //   poster_path: "/dm06L9pxDOL9jNSK4Cb6y139rrG.jpg",
//     //   media_type: "movie",
//     //   genre_ids: [9648, 53, 27, 18],
//     //   popularity: 311.878,
//     //   release_date: "2023-02-01",
//     //   video: false,
//     //   vote_average: 6.567,
//     //   vote_count: 349,
//     // },
//     // {
//     //   adult: false,
//     //   backdrop_path: "/r7Dfg9aRZ78gJsmDlCirIIlNH3d.jpg",
//     //   id: 785084,
//     //   title: "The Whale",
//     //   original_language: "en",
//     //   original_title: "The Whale",
//     //   overview:
//     //     "A reclusive English teacher suffering from severe obesity attempts to reconnect with his estranged teenage daughter for one last chance at redemption.",
//     //   poster_path: "/jQ0gylJMxWSL490sy0RrPj1Lj7e.jpg",
//     //   media_type: "movie",
//     //   genre_ids: [18],
//     //   popularity: 1015.808,
//     //   release_date: "2022-12-09",
//     //   video: false,
//     //   vote_average: 7.561,
//     //   vote_count: 165,
//     // },
//     // {
//     //   adult: false,
//     //   backdrop_path: "/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",
//     //   id: 100088,
//     //   name: "The Last of Us",
//     //   original_language: "en",
//     //   original_name: "The Last of Us",
//     //   overview:
//     //     "Twenty years after modern civilization has been destroyed, Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone. What starts as a small job soon becomes a brutal, heartbreaking journey, as they both must traverse the United States and depend on each other for survival.",
//     //   poster_path: "/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
//     //   media_type: "tv",
//     //   genre_ids: [18, 10759],
//     //   popularity: 6990.925,
//     //   first_air_date: "2023-01-15",
//     //   vote_average: 8.823,
//     //   vote_count: 1934,
//     //   origin_country: ["US"],
//     // },
//   ]);

//   const getMovieRequest = async () => {
//     const url = `https://api.themoviedb.org/3/trending/all/day?api_key=4c3ee0a8ad3c867a7badec329ce08788`;

//     const response = await fetch(url);
//     const responseJson = await response.json();

//     // if (responseJson.Search) {
//     //   setMovies(responseJson.Search);
//     // }
//   };

//   useEffect(() => {
//     getMovieRequest();
//   }, []);

//   return (
//     <div className="container-fluid movie-app">
//       <div className="row">
//         <MovieList movies={movies} />
//       </div>
//     </div>
//   );
// }

export default App;
