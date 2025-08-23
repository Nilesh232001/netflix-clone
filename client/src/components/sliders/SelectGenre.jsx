import styled from "styled-components";

export default function SelectGenre({ genres = [], type, onChange }) {
  return (
    <Select onChange={(e) => onChange(e.target.value)}>
      <option value="">Select Genre</option>
      {genres.map((g) => (
        <option key={g.id} value={g.id}>{g.name}</option>
      ))}
    </Select>
  );
}

const Select = styled.select`
  margin-left: 5rem; cursor: pointer; font-size: 1.1rem;
  background: rgba(0,0,0,.4); color: #fff; padding: .4rem .6rem; border: 1px solid #555; border-radius: .25rem;
`;
