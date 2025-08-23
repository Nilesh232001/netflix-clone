import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase";

export default function Navbar({ isScrolled }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(firebaseAuth);
    navigate("/login");
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser && location.pathname !== "/signup") navigate("/login");
  });

  return (
    <Container className={isScrolled ? "scrolled" : ""}>
      <div className="logo">Netflix</div>
      <ul className="links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/tv">TV Shows</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/my-list">My List</Link></li>
      </ul>
      <button className="logout" onClick={handleLogout}>Logout</button>
    </Container>
  );
}

const Container = styled.nav`
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 100;
  background: transparent;
  transition: background 0.3s ease-in-out;
  &.scrolled { background: rgba(0,0,0,0.85); }
  .logo { font-weight: 800; font-size: 1.3rem; }
  .links { display: flex; list-style: none; gap: 1rem; }
  .links a { color: #fff; text-decoration: none; font-weight: 500; }
  .logout { background: #e50914; color: #fff; border: 0; padding: .5rem .9rem; border-radius: .25rem; cursor: pointer; }
`;
