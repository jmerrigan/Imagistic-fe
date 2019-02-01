import React, { Component } from 'react';
import Navbar from './Navbar';
import '../styles/Gallery.css';

class Gallery extends Component {

  state ={}

  render() {
    const { fullImgArray, imgArr1, imgArr2 } = this.props
    let albumsArray = []
    if (fullImgArray) {
      fullImgArray.map(img => {
        for (let i = 0; i < img.album.length; i++) {
          albumsArray.push(img.album[i])
        }
      })
      // console.log(everyAlbum)
      // console.log(albumsArray)
      var uniqueAlbums = [...new Set(albumsArray)];
      // console.log(unique)
    }
    if(imgArr1) {
    return (
      <div className="galleryPageContainer">
        <nav>
          <Navbar />
        </nav>
        <div className="container">
          <div className="gallerySideBar">
            <strong className="filterHeading">Filtering Options</strong>
            <br/>
            <br/>
            <strong>Albums:</strong>
            <br/>
            {uniqueAlbums.map((album, index) => {
              return <p id={index}>{album}</p>
            })}
          </div>

          <div className="column">
          {imgArr1.map((img, index) => {
            return (
              <img src={img.image} id={`1${index}`} alt=""/>
            )
          })}
          </div>
          <div className="column">
          {imgArr2.map((img, index) => {
            return (
              <img src={img.image} id={`2${index}`} alt=""/>
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