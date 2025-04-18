import React, { useState } from "react";
import "../App.css";
import { Stack, Form, Button } from "react-bootstrap";

// onSearch는 부모 컴포넌트로부터 전달받은 함수.
// 이 함수는 사용자가 검색어를 제출(submit)할 때 호출되어 검색 결과를 처리하게 된다.
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // 입력한 문자열의 앞뒤 공백을 제거한 후, 빈 문자열이 아닌지 확인함 .trim
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="search-form w-50 mt-3">
      <Stack direction="horizontal" gap={2}>
        <Form.Control
          type="text"
          value={query}
          placeholder="영화 제목을 입력하세요."
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <Button variant="secondary" type="submit" className="search-button">
          Search
        </Button>
      </Stack>
    </Form>
  );
};

export default SearchBar;
