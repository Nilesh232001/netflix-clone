import styled from "styled-components";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserLikedMovies } from "../../store";
import Card from "../../components/sliders/Card";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";

export default function UserLiked() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((s) => s.netflix.movies);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/login");
      else setEmail(currentUser.email);
    });
  }, [navigate]);

  useEffect(() => { if (email) dispatch(getUserLikedMovies(email)); }, [email, dispatch]);

  window.onscroll = () => setIsScrolled(window.pageYOffset > 0);
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content">
        <h1>My List</h1>
        <div className="grid">
          {movies.map((m, i) => (
            <Card key={m.id} index={i} movieData={m} isLiked />
          ))}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  background: #000; min-height: 100vh; color: #fff;
  .content { margin-top: 8rem; display: flex; flex-direction: column; gap: 3rem; }
  h1 { margin-left: 3rem; }
  .grid { display: flex; flex-wrap: wrap; gap: 1rem; padding: 0 3rem 3rem; }
`;
