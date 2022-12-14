import React, { useEffect, useState } from 'react';
import Navibar from '../components/Navibar';
import poster from '../images/poster.jpeg';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos, getGenres } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import Grids from '../components/Grids';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch =useDispatch();

  const movies = useSelector((state) => state.videos.movies);
  const genres = useSelector((state) => state.videos.genres);
  const loaded = useSelector((state) => state.videos.loaded);

  
  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (loaded) {
      dispatch(fetchVideos({ genres, type: "all" }));
    }
  }, [loaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });
  
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navibar isScrolled={isScrolled} />
      <div className="bg">
        <img
          src={poster}
          alt="poster"
          className="poster"
        />
        <div className="container">
          
          <div className="buttons flex">
            <button
              onClick={() => navigate("/videoPlayer")}
              className="flex jutisfy-center align-center"
            >
              <FaPlay />
              Play
            </button>
            <button className="flex jutisfy-center align-center">
              <AiOutlineInfoCircle />
              Info
            </button>
          </div>
        </div>
      </div>
      <Grids movies={movies} />
    </Container>
  )
}


const Container = styled.div`
  .bg {
    position: relative;
    .poster {
      filter: brightness(75%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .poster {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 3rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          color: orange;
          background-color: white;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2rem;
          border: none;
          cursor: pointer;
    
        }
      }
    }
  }
`;

