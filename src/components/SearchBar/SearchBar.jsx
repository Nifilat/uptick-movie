import React from 'react';
import './SearchBar.css';

const SearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  selectedGenre, 
  onGenreChange, 
  genres,
  releaseYear,
  onReleaseYearChange 
}) => {
  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="filters">
        <select 
          value={selectedGenre} 
          onChange={(e) => onGenreChange(e.target.value)}
          className="genre-filter"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>

        <select 
          value={releaseYear} 
          onChange={(e) => onReleaseYearChange(e.target.value)}
          className="year-filter"
        >
          <option value="">All Years</option>
          {Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar; 