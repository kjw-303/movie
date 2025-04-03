import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, onToggleLike, wishlist }) => {
  if (!movies || movies.length === 0) {
    return <div>검색 결과가 없습니다.</div>;
  }

  return (
    <div className="movie-list d-flex flex-wrap">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleLike={onToggleLike}
          isLiked={wishlist?.some((item) => item.id === movie.id)}
        />
      ))}
    </div>
  );
};

export default MovieList;
