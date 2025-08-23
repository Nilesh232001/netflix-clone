import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL, SERVER_BASE } from "../utils/constants.js";

/* STATE */
const initialState = {
  movies: [],
  genres: [],
  genresLoaded: false
};

/* THUNKS: Genres */
export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const { data } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return data.genres || [];
});

/* Helpers */
const buildMovies = (results, genres) => {
  const out = [];
  results.forEach((movie) => {
    if (movie.backdrop_path) {
      const names = (movie.genre_ids || []).map((gid) => {
        const found = genres.find((g) => g.id === gid);
        return found ? found.name : null;
      }).filter(Boolean);
      out.push({
        id: movie.id,
        name: movie.original_name || movie.original_title || "Untitled",
        image: movie.backdrop_path,
        genres: names.slice(0, 3)
      });
    }
  });
  return out;
};

/* THUNKS: Trending (Home) */
export const fetchMovies = createAsyncThunk("netflix/trending", async ({ type = "all" }, thunkAPI) => {
  const state = thunkAPI.getState();
  const { genres } = state.netflix;
  const movies = [];
  for (let i = 1; i <= 10 && movies.length < 60; i++) {
    const { data } = await axios.get(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}&page=${i}`);
    movies.push(...buildMovies(data.results || [], genres));
  }
  return movies.slice(0, 60);
});

/* THUNKS: Discover by genre */
export const fetchDataByGenre = createAsyncThunk("netflix/movies-by-genre", async ({ genre, type }, thunkAPI) => {
  const state = thunkAPI.getState();
  const { genres } = state.netflix;
  const { data } = await axios.get(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`);
  return buildMovies(data.results || [], genres);
});

/* THUNKS: My List (server) */
export const getUserLikedMovies = createAsyncThunk("netflix/get-liked", async (email) => {
  const { data } = await axios.get(`${SERVER_BASE}/api/user/liked/${email}`);
  return data.movies || [];
});

export const removeFromLikedMovies = createAsyncThunk("netflix/remove-liked", async ({ email, movieId }) => {
  const { data } = await axios.put(`${SERVER_BASE}/api/user/delete`, { email, movieId });
  return data.movies || [];
});

/* SLICE */
const netflixSlice = createSlice({
  name: "netflix",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGenres.fulfilled, (state, { payload }) => {
        state.genres = payload;
        state.genresLoaded = true;
      })
      .addCase(fetchMovies.fulfilled, (state, { payload }) => {
        state.movies = payload;
      })
      .addCase(fetchDataByGenre.fulfilled, (state, { payload }) => {
        state.movies = payload;
      })
      .addCase(getUserLikedMovies.fulfilled, (state, { payload }) => {
        state.movies = payload;
      })
      .addCase(removeFromLikedMovies.fulfilled, (state, { payload }) => {
        state.movies = payload;
      });
  }
});

export const store = configureStore({
  reducer: {
    netflix: netflixSlice.reducer
  }
});
