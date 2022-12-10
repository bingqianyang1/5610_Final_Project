import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Background from '../components/Background';
import Header from '../components/Header';
import { firebaseAuth } from '../utils/firebase-config';

export default function Login() {
  const navigate = useNavigate();
  const [registerVal, setRegisterVal] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async () => {
    try {
      const { email, password } = registerVal;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
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
        <Header />
        <div className="body flex column align-center justify-center">
            <div className='text'>
                <h1>Login here.</h1>
                
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
                <button onClick={handleLogin}>
                  Login
                </button>
            </div>

            <div>
              <h4>
                Do not have an account? Register here.
              </h4>
            </div>

            <button>Register</button>
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
