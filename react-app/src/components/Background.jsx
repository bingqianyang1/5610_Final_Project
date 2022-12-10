import React from 'react';
import background from "../images/background.jpeg";
import styled from 'styled-components';


export default function Background() {
  return (
    <Container>
        <img src={background} alt='background' />
    </Container>
  )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    img {
    height: 100vh;
    width: 100vw;
    }
`;
