import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`
      );
      setMovies(response.data.results);
    } catch (err) {
      console.error("영화 검색에 실패했습니다.", err);
      setError("영화 검색에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>영화 검색 앱</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <LoadingSpinner />}
      {error && <p className="error">{error}</p>}
      {!loading && <MovieList movies={movies} />}
    </div>
  );
};

export default Home;
