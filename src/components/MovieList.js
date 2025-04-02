import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <div>검색 결과가 없습니다.</div>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
