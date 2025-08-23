import { useEffect, useState } from "react";
import styled from "styled-components";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../utils/firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/home");
    });
  }, [navigate]);

  return (
    <Container>
      <form onSubmit={signup}>
        <h2>Create Account</h2>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        <button type="submit">Sign Up</button>
        <p>Already have an account? <Link to="/login">Sign in</Link></p>
      </form>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh; display: grid; place-items: center; background: #000; color: #fff;
  form { display: flex; flex-direction: column; gap: .75rem; width: 300px; }
  input { padding: .6rem .8rem; border-radius: .25rem; border: 1px solid #444; background: #111; color: #fff; }
  button { padding: .6rem .8rem; border: 0; border-radius: .25rem; background: #e50914; color: #fff; cursor: pointer; }
  a { color: #fff; }
`;
