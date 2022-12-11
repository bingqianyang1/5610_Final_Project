import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_Key, TMDB_BASE_URL } from "../utils/external-api";


const initialState = {
    movies: [],
    loaded: false,
    genres: [],
};

export const getGenres = createAsyncThunk("videos/genres", async () => {
    const {data : {genres}} = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_Key}`);
    return genres;
});


const createArrayFromData = (data, moviesArray, genres) => {
    data.forEach((movie) => {
      const movieGenres = [];
      movie.genre_ids.forEach((genre) => {
        const name = genres.find(({ id }) => id === genre);
        if (name) movieGenres.push(name.name);
      });
      if (movie.backdrop_path)
        moviesArray.push({
          id: movie.id,
          name: movie?.original_name ? movie.original_name : movie.original_title,
          image: movie.backdrop_path,
          genres: movieGenres.slice(0, 3),
        });
    });
};



const getData = async (api, genres, paging = false) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
      const {
        data: { results },
      } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      createArrayFromData(results, moviesArray, genres);
    }
    return moviesArray;
    
};

export const fetchDataByGenre = createAsyncThunk(
    "videos/genre",
    async ({ genre, type }, thunkAPI) => {
      const {
        videos: { genres },
      } = thunkAPI.getState();
      return getData(
        `${TMDB_BASE_URL}/discover/${type}?api_key=${API_Key}&with_genres=${genre}`,
        genres
      );
  
    }
  );


export const fetchVideos = createAsyncThunk(
    "videos/trending",
    async ({ type }, thunkAPI) => {
      const {
        videos: { genres },
      } = thunkAPI.getState();
      return getData(
        `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_Key}`,
        genres,
        true
      );
      }
);


export const getCollection = createAsyncThunk(
    "vidoes/getCollection",
    async (email) => {
      const {
        data: { movies },
      } = await axios.get(`http://localhost:5000/api/user/collection/${email}`);
      return movies;
    }
);

export const editCollection = createAsyncThunk(
    "videos/removeFromCollection",
    async ({ movieId, email }) => {
      const {
        data: { movies },
      } = await axios.put("http://localhost:5000/api/user/remove", {
        email,
        movieId,
      });
      return movies;
    }
  );


const VideoSlice = createSlice({
    name: "Videos",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.loaded = true;
    });
    builder.addCase(fetchVideos.fulfilled, (state, action) => {
        state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
        state.movies = action.payload;
      });

      builder.addCase(getCollection.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
      builder.addCase(editCollection.fulfilled, (state, action) => {
        state.movies = action.payload;
      });




    }
});

export const store = configureStore({
    reducer: {
      videos: VideoSlice.reducer
    },
});

export const { setTypes, setMovies } = VideoSlice.actions;