import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navibar from "../components/Navibar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchVideos, getGenres } from "../store";
import ChooseType from "../components/ChooseType";
import Grids from "../components/Grids";
import Error from "../components/Error";

export default function Movies() {

  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.videos.movies);
  const genres = useSelector((state) => state.videos.genres);
  const loaded = useSelector((state) => state.videos.loaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (loaded) {
      dispatch(fetchVideos({ genres, type: "movie" }));
    }
  }, [loaded]);
  
  const [user, setUser] = useState(undefined);


  /*
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setUser(currentUser.uid);
    else navigate("/login");
  });
  */
 
  

  return (
    <Container>
      <div className="navibar">
        <Navibar isScrolled={isScrolled} />
      </div>
      <ChooseType genres={genres} type="movie"/>
      <div className="data">
      {movies ? <Grids movies={movies} /> : <Error />}
      </div>
      
    </Container>
  )
}


const Container = styled.div`
  .data {
    margin-top: 2rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 6rem;
    }
  }
`;



