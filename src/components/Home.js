import React, { Component } from 'react';
import '../styles/Home.css';

class Home extends Component {

  state = {
    // the deafult array of images used for the Home/Splash page
    background:[
      'https://res.cloudinary.com/dx0fhazu1/image/upload/w_1600,h_1080/v1548302393/divine_light.jpg',
      'https://res.cloudinary.com/dx0fhazu1/image/upload/w_1600,h_1080/v1548979426/iollsrqfzhr1grvo1a29.jpg',
      'https://res.cloudinary.com/dx0fhazu1/image/upload/w_1600,h_1080/v1548302393/_MG_5366.jpg',
      'https://res.cloudinary.com/dx0fhazu1/image/upload/w_1600,h_1080/v1548302393/Theres_a_Sunset_Somewhere_x_3.jpg',
      'http://res.cloudinary.com/dx0fhazu1/image/upload/w_1600,h_1080/v1548978869/cuysnnkmqyltqx0ieoyb.jpg'
  ], 
    counter: 0};


  componentDidMount() {

    // created a timer to run a function that changes the background image every 5000 milliseconds (5 seconds) 
    setInterval(this.imageTransition, 5000)
  }


  // function that will change the background image on click
  handleImageClick = () => {
    this.setState({counter: this.state.counter + 1})
    if (this.state.counter === 4){
      this.setState({counter: 0})
    }
  }

  // function that changes the background image
  imageTransition = () => {
    this.setState({ counter: this.state.counter + 1 })
    if (this.state.counter === 5) {
      this.setState({ counter: 0 })
    }
  } 

  render() {
  const image = this.state.background[this.state.counter]


    return (
  
      <div id="SplashPage" onClick={this.handleImageClick} style={{backgroundImage: `url(${image})`}}>
      
        <>
          <a id='SplashLogo' href='/'>IMAGISTIC</a>
          <a className='SplashNavLinks' href='/gallery'>GALLERY</a>
          <a className='SplashNavLinks' href='/about'>ABOUT</a>
          <a className='SplashNavLinks' href='/contact'>CONTACT</a>
        </>
      </div>
    );
  }
}

export default Home;