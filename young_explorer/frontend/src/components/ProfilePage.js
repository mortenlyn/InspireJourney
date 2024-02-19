import React, { useEffect, useState } from 'react';
import {  Link } from "react-router-dom";
import Header from './Header';

function ProfilePage() {
  const [profile, setProfile] = useState({
    username: "",
    mail: ""
    
  });

  useEffect(() => {

    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/user_api/user');
        const data = await response.json();

        setProfile({
          username: data.username,
          email: data.email,

        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
  
    fetchUserProfile();
  }, []);
  
  return (
    <>
      <Header />
      <div>
        <h2>Profile Page</h2>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Birthdate:</strong> {profile.birthdate}</p>
        <p><strong>Nationality:</strong> {profile.nationality}</p>

        <Link to="/home">
          <button id="homebutton">Return to homepage</button>
        </Link>
      </div>
    </>
  );
}

export default ProfilePage;
