import React from 'react'

//import { useNavigate } from 'react-router-dom';
import '../App.css';
import './header-section.css';

function headersection() {
    //let navigate = useNavigate();

    /*const routeChange = () => { 
        let path = '/services'; 
        //navigate(path);
      }*/
    
      return (
        <div className='header-container'>
          <img src='./cropped-header-bilde.jpg'

            style={{ marginTop: -100 , width: 1450}}
            id='beach-picture'
            alt='beach and water'
          />
          <h1 id="header-text" style={{ position: 'absolute', top: '35%', left: '50%',  transform: 'translate(-50%, -50%)', zIndex: 1 }}>Adventure Awaits</h1>
        </div>
      )

              //style={{height: '337px', objectFit: 'scale-down' }}
      /*<div className='cropped-image-container'>
            <img src='./cropped-header-bilde.jpg'
              style={{marginTop:-100}}
              id='beach-picture' alt='beach and water'/>
          </div>*/

          /*<div className='header-container'>
          <img src='./cropped-header-bilde.jpg'
              style={{marginTop:-100}}
              id='beach-picture' alt='beach and water'/>
          <h1>Adventure Awaits</h1>
        </div>*/

      
            
          

           

} 

export default headersection;