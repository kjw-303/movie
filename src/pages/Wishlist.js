import React, { useContext } from "react";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";
import { WishlistContext } from "../contexts/WishlistContext";

const Wishlist = () => {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div>
      <h1>위시리스트</h1>
      <Link to="/">홈으로 돌아가기기</Link>
      {wishlist.length === 0 ? (
        <div>아직 좋아요 선택한 영화가 없습니다.</div>
      ) : (
        <div>
          {wishlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
