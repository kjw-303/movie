import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import { WishlistProvider } from "./contexts/WishlistContext";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <div className="App">
      <WishlistProvider>
        <Router>
          <nav>
            <Link to="/" style={{ marginRight: 10 }}>
              홈
            </Link>
            <Link to="/wishlist">위시리스트</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </Router>
      </WishlistProvider>
    </div>
  );
}

export default App;
