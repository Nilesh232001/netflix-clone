import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login.jsx";
import Signup from "./auth/Signup.jsx";
import Netflix from "./home/Netflix.jsx";
import Movies from "./movies/Movies.jsx";
import TVShows from "./tv/TVShows.jsx";
import Player from "./player/Player.jsx";
import UserLiked from "./user/UserLiked.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Netflix />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv" element={<TVShows />} />
      <Route path="/player" element={<Player />} />
      <Route path="/my-list" element={<UserLiked />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
