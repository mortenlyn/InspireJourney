import React from 'react'

//import { useNavigate } from 'react-router-dom';
import '../App.css';
import './header-section.css';

function headersection() {
    //let navigate = useNavigate();

    const routeChange = () => { 
        let path = '/services'; 
        //navigate(path);
      }
    
      return (
        <div className='header-container'>
            <image src='./assets/Header-bilde.jpg'></image>
            <h1>Adventure Awaits</h1>
        </div>
      )

} 

export default headersection;