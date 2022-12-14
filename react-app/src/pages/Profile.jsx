import React, { useState } from 'react';
import Navibar from '../components/Navibar';
import { firebaseAuth } from '../utils/firebase-config';
import { getAuth, getIdToken, onAuthStateChanged, updateEmail, sendPasswordResetEmail, updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Profile() {
  const navigate = useNavigate();

  const [loginVal, setLoginVal] = useState({
    email: "",
    password: ""
  });
  const auth = getAuth();
  const user = auth.currentUser;

 

  const { email, password } = loginVal;
  
  /*
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        const token = getIdToken(currentUser);
      }
    });
  */


    const handleUpdate = async () => {
      try {
        await updatePassword(user, password);
        console.log('Password changed');
      } catch(err) {
        console.log(err)
      }
  };

 


  return (
    <Container>
    <Navibar />
    <div className="content">
        <h1 className='align-center'>
            My Profile
        </h1>
        
      <div className="body flex column align-center justify-center">
      <h2>
            Change your password here.
        </h2>


        <div className='form'>
          <div><label>Email</label></div>
          
                <input type="email" name = "email" placeholder="Email" 
                value={user?.email} />
         
                 
          </div>
          

      
          <div className='form align-center jutsify-between'>
            <div>
              <label>Password</label>
            </div>
                <input id="password" type="password" name = "password" placeholder="Password" 
                value={loginVal.password} 
                onChange={(event) => setLoginVal({...loginVal, [event.target.name]: event.target.value})} />
                
          <div>
              <button onClick={handleUpdate}>
                Rest Password
              </button>

              
          </div>

          
      </div>
    </div>
    </div>
    </Container>
  
  )
}


const Container = styled.div`
position: relative;
.content {
  margin: 2rem;
    margin-top: 2rem;
    gap: 2rem;
  .body {
    gap: 1.5rem;
    .form {
      input {
        padding: 1rem;
        font-size: 1.2rem;
        border: none;
      }
      label {
        
        font-size: 1.2rem;
        font-weight: bold;
      }
    }
    button {
      padding: 0.5rem 1rem;
      background-color: orange;
      cursor: pointer;
      color: black;
      margin: 1rem;
      border-radius: 0.2rem;
      font-weight: bolder;
      font-size: 1.1rem;
    }

  }
}
`;
