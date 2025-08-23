import styled from "styled-components";
import Navbar from "../../components/Navbar.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../../store/index.js";
import Slider from "../../components/Slider.jsx";

import background from "../../assets/background.jpg";
import movieLogo from "../../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../utils/firebase.js";
import { useNavigate } from "react-router-dom";

export default function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((state) => state.netflix.movies);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  useEffect(() => { dispatch(getGenres()); }, [dispatch]);
  useEffect(() => { if (genresLoaded) dispatch(fetchMovies({ type: "all" })); }, [genresLoaded, dispatch]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  window.onscroll = () => setIsScrolled(window.pageYOffset > 0);
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img src={background} alt="background" className="background" />
        <div className="container">
          <div className="logo"><img src={movieLogo} alt="movie logo" /></div>
          <div className="buttons">
            <button className="flex" onClick={() => navigate("/player")}><FaPlay /> Play</button>
            <button className="flex"><AiOutlineInfoCircle /> More Info</button>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <Slider movies={movies} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: black; color: white;
  .hero { position: relative; }
  .hero .background { filter: brightness(60%); height: 100vh; width: 100vw; object-fit: cover; }
  .hero .container { position: absolute; bottom: 5rem; }
  .logo img { width: 100%; height: 100%; margin-left: 5rem; max-width: 450px; }
  .buttons { margin: 5rem; display: flex; gap: 2rem; }
  .buttons .flex {
    display: flex; align-items: center; gap: 1rem;
    font-size: 1.1rem; border-radius: .2rem; padding: .5rem 2rem;
    border: none; cursor: pointer; transition: .3s ease-out;
  }
  .buttons .flex:hover { opacity: .8; }
  .buttons .flex:nth-of-type(2) { background: rgba(109,109,110,0.7); color: #fff; }
  .buttons .flex:nth-of-type(1) { background: #fff; color: #000; }
`;
