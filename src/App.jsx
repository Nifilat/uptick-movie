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
  const [animeList, setAnimeList] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeNav, setActiveNav] = useState("home");

  // Move fetchAnime outside of useEffect
  const fetchAnime = async () => {
    try {
      const animeGenreId = tvGenres.find((g) => g.name.toLowerCase() === "animation")?.id;
      if (!animeGenreId) {
        console.warn("Animation genre ID not found.");
        return;
      }
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/tv`,
        {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            with_genres: animeGenreId,
            sort_by: "popularity.desc",
          },
        }
      );
      setAnimeList(response.data.results);
      
    } catch (error) {
      
    }
  };

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
        console.log('TV Genres:', response.data.genres);
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

  // Fetch anime when tvGenres is available
  useEffect(() => {
    if (tvGenres.length > 0) {
      fetchAnime();
    }
  }, [tvGenres]);

  let currentGenres = movieGenres;
  if (activeNav === "series" || activeNav === "anime") {
    currentGenres = tvGenres;
  }

  const genreNames = (genreIds, type = "movie") => {
    const genres = type === "tv" ? tvGenres : movieGenres;
    return genreIds
      .map((genreId) => {
        const genre = genres.find((genre) => genre.id === genreId);
        return genre ? genre.name : "";
      })
      .join(", ");
  };

  let featuredItem = null;
  if (activeNav === "home") {
    featuredItem = trending.length > 0 ? trending[0] : null;
  } else if (activeNav === "movies") {
    featuredItem = movies.length > 0 ? movies[0] : null;
  } else if (activeNav === "series") {
    featuredItem = series.length > 0 ? series[0] : null;
  } else if (activeNav === "anime") {
    featuredItem = animeList.length > 0 ? animeList[0] : null;
  }

  const newCollections = [...trending].reverse().slice(0, 16);
  const anime = animeList;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1979 }, (_, i) => String(currentYear - i));

  const filterAll = (items) => {
    let filtered = [...items];
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        (item.title || item.name)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }
    if (selectedGenre) {
      filtered = filtered.filter((item) => {
         const genresToFilter = (activeNav === "series" || activeNav === "anime") ? tvGenres : movieGenres;
         return item.genre_ids && item.genre_ids.includes(Number(selectedGenre)) &&
                genresToFilter.some(genre => genre.id === Number(selectedGenre));
      });
    }
    if (selectedYear) {
      filtered = filtered.filter((item) => {
        const releaseDate = item.release_date || item.first_air_date;
        return releaseDate && releaseDate.startsWith(selectedYear);
      });
    }
    return filtered;
  };

  const anyFilterActive = searchQuery || selectedGenre || selectedYear;
  let mainContent = null;
  if (anyFilterActive) {
    let baseItems = trending;
    if (activeNav === "movies") baseItems = movies;
    else if (activeNav === "series") baseItems = series;
    else if (activeNav === "anime") baseItems = animeList;

    mainContent = (
      <SectionRow
        title="Results"
        items={filterAll(baseItems)}
        onCardClick={setSelectedMovie}
        genreNames={(genreIds) => genreNames(genreIds, activeNav === "movies" ? "movie" : "tv")}
      />
    );
  } else if (activeNav === "home") {
    mainContent = (
      <>
        <SectionRow
          title="Trending"
          items={trending.slice(0, 12)}
          onCardClick={setSelectedMovie}
          genreNames={(genreIds) => genreNames(genreIds, "all")}
        />
        <SectionRow
          title="New Collections"
          items={newCollections}
          onCardClick={setSelectedMovie}
          genreNames={(genreIds) => genreNames(genreIds, "all")}
        />
      </>
    );
  } else if (activeNav === "movies") {
    mainContent = (
      <SectionRow
        title="All Movies"
        items={movies}
        onCardClick={setSelectedMovie}
        genreNames={(genreIds) => genreNames(genreIds, "movie")}
      />
    );
  } else if (activeNav === "series") {
    mainContent = (
      <SectionRow
        title="All Series"
        items={series}
        onCardClick={setSelectedMovie}
        genreNames={(genreIds) => genreNames(genreIds, "tv")}
      />
    );
  } else if (activeNav === "anime") {
    mainContent = (
      <SectionRow
        title="All Anime"
        items={animeList}
        onCardClick={setSelectedMovie}
        genreNames={(genreIds) => genreNames(genreIds, "tv")}
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
          genreNames={(genreIds) => genreNames(genreIds, selectedMovie?.media_type)}
        />
      )}
    </div>
  );
}

export default App;
