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
  const [trending, setTrending] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/all/week`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
            },
          }
        );
        setTrending(response.data.results);
      } catch (error) {
        console.error("Error fetching trending:", error);
      }
    };

    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              sort_by: "popularity.desc",
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchSeries = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/tv`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              sort_by: "popularity.desc",
            },
          }
        );
        setSeries(response.data.results);
      } catch (error) {
        console.error("Error fetching series:", error);
      }
    };

    const fetchMovieGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
            },
          }
        );
        setMovieGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching movie genres:", error);
      }
    };

    const fetchTvGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/tv/list`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
            },
          }
        );
        setTvGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching tv genres:", error);
      }
    };

    fetchTrending();
    fetchMovies();
    fetchSeries();
    fetchMovieGenres();
    fetchTvGenres();
  }, []);

  // Pick correct genres for current tab
  let currentGenres = movieGenres;
  if (activeNav === "series" || activeNav === "anime") {
    currentGenres = tvGenres;
  }

  // Helper for genre names
  const genreNames = (genreIds, type = "movie") => {
    const genres = type === "tv" ? tvGenres : movieGenres;
    return genreIds
      .map((genreId) => {
        const genre = genres.find((genre) => genre.id === genreId);
        return genre ? genre.name : "";
      })
      .join(", ");
  };

  // Featured item logic based on tab
  let featuredItem = null;
  if (activeNav === "home") {
    featuredItem = trending.length > 0 ? trending[0] : null;
  } else if (activeNav === "movies") {
    featuredItem = movies.length > 0 ? movies[0] : null;
  } else if (activeNav === "series") {
    featuredItem = series.length > 0 ? series[0] : null;
  } else if (activeNav === "anime") {
    const animeGenreId = tvGenres.find((g) => g.name.toLowerCase() === "animation")?.id;
    const anime = series.filter((m) => m.genre_ids.includes(animeGenreId));
    featuredItem = anime.length > 0 ? anime[0] : null;
  }

  // New Collections: latest 16 movies/series (reverse order for demo)
  const newCollections = [...trending].reverse().slice(0, 16);
  // Anime: filter by genre (e.g., Animation or a specific genre id from tvGenres)
  const animeGenreId = tvGenres.find((g) => g.name.toLowerCase() === "animation")?.id;
  const anime = series.filter((m) => m.genre_ids.includes(animeGenreId));

  // Generate years for dropdown (1980 to current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1979 }, (_, i) => String(currentYear - i));

  // Filter by search, genre, and year
  const filterAll = (items, type = "movie") => {
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
    // Use correct type for filtering: if on series/anime, filter TV, else all
    let items = trending;
    if (activeNav === "movies") items = movies;
    else if (activeNav === "series" || activeNav === "anime") items = series;
    // For anime, filter only anime
    if (activeNav === "anime") items = anime;
    mainContent = (
      <SectionRow
        title="Results"
        items={filterAll(items)}
        onCardClick={setSelectedMovie}
        genreNames={genreNames}
      />
    );
  } else if (activeNav === "home") {
    mainContent = (
      <>
        <SectionRow
          title="Trending"
          items={trending.slice(0, 12)}
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
        items={movies}
        onCardClick={setSelectedMovie}
        genreNames={genreNames}
      />
    );
  } else if (activeNav === "series") {
    mainContent = (
      <SectionRow
        title="All Series"
        items={series}
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
        genres={currentGenres}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        years={years}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />
      {/* Only show HeroSection if not on Profile tab and featuredItem exists */}
      {activeNav !== "profile" && featuredItem && (
        <HeroSection
          movie={featuredItem}
          onViewMore={() => setSelectedMovie(featuredItem)}
          mediaType={featuredItem.media_type}
        />
      )}
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
