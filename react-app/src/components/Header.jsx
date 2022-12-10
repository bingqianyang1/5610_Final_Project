import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.png';

export default function Header(props) {
  const navigate = useNavigate(); 
  return (
    <Container className='flex align-center justify-between'>
        <div className="logo">
            <img src={logo} alt='logo' />
        </div>
        <button onClick={()=>navigate(props.login?"/login":"/register")}>
            {props.login ? "Login" : "Register"} 
        </button>
      
    </Container>
  )
}

const Container = styled.div`
    padding: 0 1rem;
    .logo {
    img {
        height: 7rem;
        width: 13rem;
    }
    }
    button {
    padding: 0.5rem 1rem;
    background-color: white;
    border: none;
    cursor: pointer;
    color: black;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
    }
`;