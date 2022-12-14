
import React, { useState } from 'react';
import Navibar from '../components/Navibar';
import { firebaseAuth } from '../utils/firebase-config';
import { getAuth, getIdToken, onAuthStateChanged, updateEmail, sendPasswordResetEmail, updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


export default function Profile() {


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
    <div>
    <Navibar />
    <div className="content">
        <h1>
            My Profile
        </h1>
        
      <div className="body flex column align-center justify-center">
      <h3>
            Change your password here.
        </h3>


      
        
          <div className='form'>
          
                <input type="password" name = "password" placeholder="Password" 
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
    </div>
  
  )
}
