// src/App.jsx
import axios from "axios";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import HeroSection from "./components/HeroSection/HeroSection";
import SectionRow from "./components/SectionRow/SectionRow";
import MovieDetails from "./components/MovieDetails/MovieDetails";

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeNav, setActiveNav] = useState("home");

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

  const genreNames = (genreIds) => {
    return genreIds
      .map((genreId) => {
        const genre = genres.find((genre) => genre.id === genreId);
        return genre ? genre.name : "";
      })
      .join(", ");
  };

  // Featured movie for hero section (first trending movie)
  const featuredMovie = movies.length > 0 ? movies[0] : null;

  // Trending: first 12 movies/series
  const trending = movies.slice(0, 12);
  // New Collections: latest 16 movies/series (reverse order for demo)
  const newCollections = [...movies].reverse().slice(0, 16);
  // All Movies: filter for type 'movie'
  const allMovies = movies.filter((m) => m.media_type === "movie");
  // All Series: filter for type 'tv'
  const allSeries = movies.filter((m) => m.media_type === "tv");
  // Anime: filter by genre (e.g., Animation or a specific genre id)
  const animeGenreId = genres.find((g) => g.name.toLowerCase() === "animation")?.id;
  const anime = movies.filter((m) => m.genre_ids.includes(animeGenreId));

  // Generate years for dropdown (1980 to current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1979 }, (_, i) => String(currentYear - i));

  // Filter by search, genre, and year
  const filterAll = (items) => {
    let filtered = [...items];
    if (searchQuery) {
      filtered = filtered.filter((movie) =>
        (movie.title || movie.name)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }
    if (selectedGenre) {
      filtered = filtered.filter((movie) =>
        movie.genre_ids && movie.genre_ids.includes(Number(selectedGenre))
      );
    }
    if (selectedYear) {
      filtered = filtered.filter((movie) => {
        const releaseDate = movie.release_date || movie.first_air_date;
        return releaseDate && releaseDate.startsWith(selectedYear);
      });
    }
    return filtered;
  };

  // If any filter/search is active, show all matching results
  const anyFilterActive = searchQuery || selectedGenre || selectedYear;
  let mainContent = null;
  if (anyFilterActive) {
    mainContent = (
      <SectionRow
        title="Results"
        items={filterAll(movies)}
        onCardClick={setSelectedMovie}
        genreNames={genreNames}
      />
    );
  } else if (activeNav === "home") {
    mainContent = (
      <>
        <SectionRow
          title="Trending"
          items={trending}
          onCardClick={setSelectedMovie}
          genreNames={genreNames}
        />
        <SectionRow
          title="New Collections"
          items={newCollections}
          onCardClick={setSelectedMovie}
          genreNames={genreNames}
        />
      </>
    );
  } else if (activeNav === "movies") {
    mainContent = (
      <SectionRow
        title="All Movies"
        items={allMovies}
        onCardClick={setSelectedMovie}
        genreNames={genreNames}
      />
    );
  } else if (activeNav === "series") {
    mainContent = (
      <SectionRow
        title="All Series"
        items={allSeries}
        onCardClick={setSelectedMovie}
        genreNames={genreNames}
      />
    );
  } else if (activeNav === "anime") {
    mainContent = (
      <SectionRow
        title="All Anime"
        items={anime}
        onCardClick={setSelectedMovie}
        genreNames={genreNames}
      />
    );
  }

  return (
    <div className="app">
      <NavigationBar
        active={activeNav}
        onNavClick={setActiveNav}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        years={years}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />
      <HeroSection movie={featuredMovie} onViewMore={() => setSelectedMovie(featuredMovie)} />
      <div className="main-content">
        {mainContent}
      </div>
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

export default App;
