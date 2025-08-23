import CardSlider from "./sliders/CardSlider.jsx";

export default function Slider({ movies = [] }) {
  const getFrom = (from, to) => movies.slice(from, to);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <CardSlider title="Trending Now" data={getFrom(0, 10)} />
      <CardSlider title="New Releases" data={getFrom(10, 20)} />
      <CardSlider title="Blockbuster Movies" data={getFrom(20, 30)} />
      <CardSlider title="Popular on Netflix" data={getFrom(30, 40)} />
      <CardSlider title="Action Movies" data={getFrom(40, 50)} />
      <CardSlider title="Epics" data={getFrom(50, 60)} />
    </div>
  );
}
