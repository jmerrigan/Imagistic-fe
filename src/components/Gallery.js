import React, { Component } from 'react';
import Navbar from './Navbar';
import '../styles/Gallery.css';

class Gallery extends Component {

  render() {
    const { imgArr1, imgArr2 } = this.props
    if(imgArr1) {
    return (
      <div className="galleryPageContainer">
        <nav>
          <Navbar />
        </nav>
        <div className="container">
          <div className="gallerySideBar">
          </div>

          <div className="column">
          {imgArr1.map((img, index) => {
            return (
              <img src={img} key={index}/>
            )
          })}
          </div>
          <div className="column">
          {imgArr2.map((img, index) => {
            return (
              <img src={img} key={index}/>
            )
          })}
          </div> 
        </div>
      </div>
    );
    } else {
      return <h1>Loading...</h1>
    }
  }
}
export default Gallery;