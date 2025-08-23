import styled from "styled-components";
import Card from "./Card.jsx";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useRef, useState } from "react";

export default function CardSlider({ title, data=[] }) {
  const [showControls, setShowControls] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const listRef = useRef();

  const handleDirection = (direction) => {
    const distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  return (
    <Container
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1>{title}</h1>
      <div className="wrapper">
        <div className={`slider-action left ${!showControls ? "none" : ""}`} onClick={() => handleDirection("left")}>
          <AiOutlineLeft />
        </div>
        <div className="slider" ref={listRef}>
          {data.map((m, i) => <Card key={m.id} movieData={m} index={i} />)}
        </div>
        <div className={`slider-action right ${!showControls ? "none" : ""}`} onClick={() => handleDirection("right")}>
          <AiOutlineRight />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex; flex-direction: column; gap: 1rem; position: relative; padding: 2rem 0;
  h1 { margin-left: 50px; }
  .wrapper { position: relative; }
  .slider {
    display: flex; gap: 1rem; width: max-content;
    transform: translateX(0px); transition: .3s ease-in-out; margin-left: 50px;
  }
  .slider-action {
    position: absolute; top: 0; bottom: 0; width: 50px; z-index: 99; display: flex; align-items: center; justify-content: center;
    transition: .3s ease-in-out;
  }
  .slider-action svg { font-size: 2rem; }
  .slider-action.left { left: 0; }
  .slider-action.right { right: 0; }
  .none { display: none; }
`;
