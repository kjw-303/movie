import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../contexts/WishlistContext";

const MovieCard = ({ movie }) => {
  // context에서 위시리스트와 토글 함수를 가져옴
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const isLiked = wishlist.some((m) => m.id === movie.id);

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
      {/* 좋아요 버튼 클릭시 위시리스트 토글글 */}
      <button onClick={() => toggleWishlist(movie)}>
        {isLiked ? "💖" : "🤍"}
      </button>
    </div>
  );
};

export default MovieCard;
