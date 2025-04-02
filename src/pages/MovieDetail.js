import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetchMovieDetail 함수 정의 및 호출
  // 비동기 API 호출을 위해 async/await를 사용합니다.
  // 순서 API 호출이 시작되면 setLoading 실행하고 setError 초기화 진행

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setLoading(true); // 로딩 상태 활성화화
      setError(null); //기존 에러를 초기화
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        setMovie(response.data);
      } catch (error) {
        console.log("상세 정보를 불러오는데 실패했습니다", error);
        setError("상세 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false); //성공 여부와 상관없이 API 호출이 끝나면 finally 블록 실행행
      }
    };
    fetchMovieDetail(); // 정의된 함수를 즉시 호출하여 API 요청을 시작작
  }, [id]);
  // 의존성 배열
  // 영화 Id가 바뀔때마다 새로운 영화의 상세정보를 요청

  if (loading) return <LoadingSpinner />;
  if (!movie) return <p>데이터가 없습니다.</p>;
  if (error) return <p className="error">{error}</p>;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">← 홈으로 돌아가기</Link>
      <div style={{ display: "flex", marginTop: "20px" }}>
        <img
          src={posterUrl}
          alt={movie.title}
          style={{ width: "300px", marginRight: "20px" }}
        />
        <div>
          <h2>{movie.title}</h2>
          <p>
            <strong>개봉일:</strong> {movie.release_date}
          </p>
          <p>
            <strong>평점:</strong> {movie.vote_average}
          </p>
          <p>
            <strong>줄거리:</strong> {movie.overview}
          </p>
          {/* 추가 정보도 표시 가능 */}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
