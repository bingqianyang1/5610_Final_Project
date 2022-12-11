import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import Card from "../components/Card";
import styled from "styled-components";
import Navibar from "../components/Navibar";
import { getCollection } from "../store";
import { useDispatch, useSelector } from "react-redux";

export default function MyCollection() {
  const movies = useSelector((state) => state.videos.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  useEffect(() => {
    if (email) {
      dispatch(getCollection(email));
    }
  }, [email]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (

    <Container>
      <Navibar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My Collection</h1>
        <div className="grid flex">
          {movies.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
              />
            );
          })}
        </div>
      </div>
    </Container>
   
  );
}

const Container = styled.div`
  .content {
    margin: 2rem;
    margin-top: 2rem;
    gap: 2rem;
    h1 {
      margin-left: 2rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 3rem;
    }
  }
`;