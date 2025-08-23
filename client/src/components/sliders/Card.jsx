import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IMAGE_BASE_URL, SERVER_BASE } from "../../utils/constants.js";
import { AiOutlinePlus, AiOutlineInfoCircle } from "react-icons/ai";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../utils/firebase.js";
import { useDispatch } from "react-redux";
import { removeFromLikedMovies } from "../../store/index.js";

export default function Card({ movieData, index, isLiked=false }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [email, setEmail] = useState();
  const dispatch = useDispatch();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
  });

  const addToList = async () => {
    if (!email) return;
    await axios.post(`${SERVER_BASE}/api/user/add`, { email, data: movieData });
  };

  const removeFromList = async () => {
    if (!email) return;
    await dispatch(removeFromLikedMovies({ email, movieId: movieData.id }));
  };

  return (
    <Container
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={`${IMAGE_BASE_URL}${movieData.image}`} alt={movieData.name} />
      {hovered && (
        <div className="hover">
          <div className="image-video-container" onClick={() => navigate("/player")}>
            <img src={`${IMAGE_BASE_URL}${movieData.image}`} alt={movieData.name} />
            <video src="/src/assets/video.mp4" autoPlay loop muted />
          </div>
          <div className="info-container">
            <h3 className="name" onClick={() => navigate("/player")}>{movieData.name}</h3>
            <div className="icons">
              <IoPlayCircleSharp title="Play" onClick={() => navigate("/player")} />
              <RiThumbUpFill title="Like" />
              <RiThumbDownFill title="Dislike" />
              {isLiked ? (
                <BsCheck title="Remove from list" onClick={removeFromList} />
              ) : (
                <AiOutlinePlus title="Add to My List" onClick={addToList} />
              )}
              <AiOutlineInfoCircle title="More Info" />
            </div>
            <div className="genres">
              <ul>
                {movieData.genres.map((g) => <li key={g}>{g}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  position: relative;
  cursor: pointer;
  img { width: 100%; height: 100%; border-radius: .2rem; z-index: 10; }
  .hover {
    z-index: 90; position: absolute; top: -18vh; left: 0;
    width: 20rem; background: #181818; border-radius: .3rem;
    box-shadow: 0 3px 10px rgba(0,0,0,.75); transition: .3s ease-in-out;
  }
  .image-video-container { position: relative; height: 140px; }
  .image-video-container img, .image-video-container video {
    position: absolute; top: 0; width: 100%; height: 140px; object-fit: cover; border-radius: .3rem;
  }
  .image-video-container video { z-index: 5; }
  .info-container { padding: 1rem; display: flex; flex-direction: column; gap: .5rem; }
  .icons { display: flex; gap: 1rem; }
  .icons svg { font-size: 2rem; cursor: pointer; transition: .3s ease-in-out; }
  .icons svg:hover { color: #b8b8b8; }
  .genres ul { display: flex; gap: 1rem; padding: 0; list-style: none; }
  .genres li { padding-right: .7rem; }
`;
