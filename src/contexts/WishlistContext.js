import React, { createContext, useEffect, useState } from "react";

// context 생성
export const WishlistContext = createContext();

// procider 컴포넌트
export const WishlistProvider = ({ children }) => {
  // 초기값을 localStorage에서 불러오면, 새로고침 후에도 유자할 수 있음
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  // wishlist 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // 좋아요 토글 함수 : 이미 있으면 제거, 없으면 추가
  const toggleWishlist = (movie) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((m) => m.id === movie.id);
      if (exists) {
        return prevWishlist.filter((m) => m.id !== movie.id);
      } else {
        return [...prevWishlist, movie];
      }
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
