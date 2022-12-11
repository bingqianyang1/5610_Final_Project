import React from 'react';
import Navibar from '../components/Navibar';
import poster from '../images/poster.jpeg';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Home() {
  
  const navigate = useNavigate();

  return (
    <Container>
      <Navibar  />
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

