import styled from "styled-components";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataByGenre, fetchMovies, getGenres } from "../../store";
import Slider from "../../components/Slider";
import SelectGenre from "../../components/sliders/SelectGenre";
import NotAvailable from "../../components/NotAvailable";

export default function Movies() {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const { movies, genres, genresLoaded } = useSelector((s) => s.netflix);

  useEffect(() => { dispatch(getGenres()); }, [dispatch]);
  useEffect(() => { if (genresLoaded) dispatch(fetchMovies({ type: "movie" })); }, [genresLoaded, dispatch]);

  const onGenreChange = (genre) => {
    if (!genre) return;
    dispatch(fetchDataByGenre({ genre, type: "movie" }));
  };

  window.onscroll = () => setIsScrolled(window.pageYOffset > 0);
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="data">
        <SelectGenre genres={genres} type="movie" onChange={onGenreChange} />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  background: #000; color: #fff; min-height: 100vh;
  .data { margin-top: 8rem; }
`;


