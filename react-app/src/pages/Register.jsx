import React from 'react';
import styled from 'styled-components';
import Background from '../components/Background';
import Header from '../components/Header';

export default function Register() {
  return (
    <Container>
      <Background />
      <div className="content">
        <Header login/>
        <div className="body flex column align-center justify-center">
            <div className="text flex column">
                <h1>Get access to thousands of videos here.</h1>
                <h4>
                Ready to explore? Enter your email to register.
                </h4>
            </div>

            <div>
                <input type="email" name = "email" placeholder="Email Address" />
            </div>
            <div>
                <input type="password" name = "password" placeholder="Password" />
            </div>
            <div>
                <button>Register</button>
            </div>
            <div>
              <h6>
                Have an account? Log in here.
              </h6>
            </div>

            <button>Login</button>
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
    grid-template-rows: 15vh 80vh;
`;
