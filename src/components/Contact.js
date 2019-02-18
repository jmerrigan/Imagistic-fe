import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/contact.css';

class Contact extends Component {
  render() {
    return (
      <div className="contactPageContainer">
        <nav>
          <Navbar />
        </nav>
        
        <div className="contactContainer">
            <div className="contact">
                <p className="contactHeading">CONTACT</p>
          
                <div className="contactTitleLine">
                </div>

                    <form className="contactForm" action="https://formspree.io/xianlilow@gmail.com" method="POST">
                      <input type="text" id="name" name="name" placeholder='NAME' onChange={this.handleInput}/>
                      <br/>
                      <br/>        
                      <input type="text" id="email" name="email" placeholder='EMAIL' onChange={this.handleInput}/>
                      <br/>
                      <br/>

                      <textarea rows="5" cols="100" name="message" placeholder='MESSAGE'></textarea>
                      <br/>
                      <input type="submit" value="Submit" id="loginButton" onClick={this.handleLogin}/>
                    </form>
            </div>
            <div className="contactPicture">
            </div>




        </div>

        <footer className="contactFootNote">
          <Footer />
        </footer>

      </div>
    );
  }
}

export default Contact;