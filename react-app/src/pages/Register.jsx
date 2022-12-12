import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Background from '../components/Background';
import Header from '../components/Header';
import { firebaseAuth } from '../utils/firebase-config';

export default function Register() {
  const navigate = useNavigate();
  const [registerVal, setRegisterVal] = useState({
    email: "",
    password: ""
  });

  const handleRegister = async () => {
    try {
      const { email, password } = registerVal;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };
  
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      navigate("/")
    };
  });

  return (
    <Container>
      <Background />
      <div className="content">
        <Header login/>
        <div className="body flex column align-center justify-center">
            <div className='text'>
                <h1>Get access to thousands of videos here.</h1>
                <h4>
                Ready to explore? Enter your email to register.
                </h4>
            </div>

            <div className='form'>
                <input type="email" name = "email" placeholder="Email Address" 
                value={registerVal.email} 
                onChange={(event) => setRegisterVal({...registerVal, [event.target.name]: event.target.value})} />
            </div>
            <div className='form'>
                <input type="password" name = "password" placeholder="Password" 
                value={registerVal.password} 
                onChange={(event) => setRegisterVal({...registerVal, [event.target.name]: event.target.value})} />
            </div>
        
            <div>
                <button onClick={handleRegister}>
                  Register
                </button>
            </div>

            <div>
              <h4>
                Have an account? Log in here.
              </h4>
            </div>

            <button onClick={() => navigate('/login')}>Login</button>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
position: relative;
.content {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 15vh 70vh;
  .body {
    gap: 1.5rem;
    .form {
      input {
        padding: 1rem;
        font-size: 1.2rem;
        border: none;
      }
    }
    button {
      padding: 0.5rem 1rem;
      background-color: white;
      cursor: pointer;
      color: black;
      border-radius: 0.2rem;
      font-weight: bolder;
      font-size: 1.1rem;
    }
  }
}
`;
