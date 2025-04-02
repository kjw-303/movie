import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-link">
        <img src={posterUrl} alt={movie.title} className="movie-img" />
        <h3>{movie.title}</h3>
        <p>개봉일 : {movie.release_date}</p>
      </Link>
    </div>
  );
};

export default MovieCard;
