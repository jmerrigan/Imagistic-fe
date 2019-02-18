import React, { Component } from 'react';
import '../styles/Navbar.css';
import '../styles/about.css';
import Navbar from './Navbar';
import Footer from './Footer';


class About extends Component {
  render() {
    return (
      <div class="aboutPageContainer">

        <nav>
          <Navbar /> 
        </nav>
        <div class="aboutContainer">
        
          <div class="aboutPicture">
          </div>
        
          <div class="aboutAbout">
          <div className="aboutTitle">
              <h1>ABOUT</h1>
              <div className="aboutTitleLine">
              </div>
                  <div className="aboutStories">
                    <p>
                      My name is David and I am an amateur nature/wildlife and landscape photographer based in Berwick, Melbourne, Victoria. Please feel free to browse my website and the images in the Albums. Should you wish to commission, use or purchase an image then please contact me via the Contact Page.
                      <br/>
                      <br/>
                      <br/>
                      <strong>Please note that all images on this site are subject to copyright ©</strong>
                      <br/>
                      Thank you
                      <br/>
                      David Sumner LAPS
                    </p>
                  </div>
              
            </div>
          </div>

        </div>

        <footer className="aboutFootNote">
          <Footer />
        </footer>
      </div>
    )}
  }




      
      
 
export default About;