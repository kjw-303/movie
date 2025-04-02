import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc"); //desc : 최신순 , asc : 오래된순순

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`
      );
      // 검색 결과를 정렬하는 함수
      const sortMovies = (moviesArray, order) => {
        return moviesArray.sort((a, b) => {
          const dateA = new Date(a.release_date);
          const dateB = new Date(b.release_date);
          return order === "desc" ? dateB - dateA : dateA - dateB;
        });
      };

      const sortedMovies = sortMovies(response.data.results, sortOrder);
      setMovies(sortedMovies);
    } catch (err) {
      console.error("영화 검색에 실패했습니다.", err);
      setError("영화 검색에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (e) => {
    const newOrder = e.target.value;
    setSortOrder(newOrder);
    setMovies((prevMovies) => {
      const sorted = [...prevMovies].sort((a, b) => {
        //정렬시에 원본 데이터를 유지하기 위해 spread 연산자 사용해서 복사본으로 만듬듬
        const dateA = new Date(a.release_date);
        const dateB = new Date(b.release_date);
        return newOrder === "desc" ? dateB - dateA : dateA - dateB;
      });
      return sorted;
    });
  };

  return (
    <div>
      <h1>영화 검색 앱</h1>
      <SearchBar onSearch={handleSearch} />
      <div>
        <label htmlFor="sortOrder">정렬 옵션 :</label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
          <option value="desc">최신순</option>
          <option value="asc">오래된된순</option>
        </select>
      </div>
      {loading && <LoadingSpinner />}
      {error && <p className="error">{error}</p>}
      {!loading && <MovieList movies={movies} />}
    </div>
  );
};

export default Home;
