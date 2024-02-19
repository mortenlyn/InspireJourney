import React, { useEffect, useState } from 'react';
import {  Link } from "react-router-dom";
import Header from './Header';

function ProfilePage({client,currentUser}) {
  return (
    
      
    <div>
      <h2>Profile Page</h2>
      <p><strong>Email:</strong> {currentUser.user.email}</p>
      <p><strong>Name:</strong> {currentUser.user.username}</p>
  

      <Link to="/home">
        <button id="homebutton">Return to homepage</button>
      </Link>
    </div>
  
);
console.log(currentUser); // Check what user contains

    
  };


  // useEffect(() => {

  //   const fetchUserProfile = async () => {
  //     try {
  //       const response = await fetch('http://127.0.0.1:8000/user_api/user');
  //       const data = await response.json();

  //       setProfile({
  //         username: data.username,
  //         email: data.email,

  //       });
  //     } catch (error) {
  //       console.error('Error fetching user profile:', error);
  //     }
  //   };
  
  //   fetchUserProfile();
  // }, []);
  



export default ProfilePage;
