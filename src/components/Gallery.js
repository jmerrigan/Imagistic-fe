import React, { Component } from 'react';
import Navbar from './Navbar';
import '../styles/Gallery.css';

class Gallery extends Component {

  state ={}

  handleClick = (e) => {
    this.props.selectedAlbumOption(e.target.id)
  }

  

  lightboxClick = (e) => {
    var element = e.target
    console.log(e.target)
        // elementID = element.getAttribute('id')
        // lightboxImg = document.getElementById('lightbox-image')
        // lightbox = document.getElementById('lightbox-overlay')
        // newImg = new Image();
  }

  render() {
    const { fullImgArray, imgArr1, imgArr2 } = this.props
    let albumsArray = []
    if (fullImgArray) {
      fullImgArray.map(img => {
        for (let i = 0; i < img.album.length; i++) {
          albumsArray.push(img.album[i])
        }
      })
      var uniqueAlbums = [...new Set(albumsArray)];
    }

    // if (element.hasAttribute('data-lightbox')) {
    //   event.preventDefault();
    //   newImg.onload = function() {
    //     lightboxImg.src = this.src;
    //   }

    //   lightboxImg.src = '';
    //   newImg.src = element.getAttribute('data-lightbox');
    //   lightbox.classList.add('visible');

    //   return(
    //     <div id="lightbox-overlay">
    //       <img src="" id="lightbox-image"/>
    //     </div>
    //   )
  // }

    // if (elementID == 'lightbox-image' || elementID == 'lightbox-overlay') {
    //   lightbox.classList.remove('visible');
    // }

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
            {uniqueAlbums.map(album => {
              return <p id={album} onClick={this.handleClick}>{album}</p>
            })}
          </div>

          <div className="column">
          {imgArr1.map((img, index) => {
            return (
              <img src={img.image} id={`1${index}`} onClick={ this.lightboxClick} data-lightbox={img.image} alt=""/>
            )
          })}
          </div>
          <div className="column">
          {imgArr2.map((img, index) => {
            return (
              <img src={img.image} id={`2${index}`} onClick={ this.lightboxClick} data-lightbox={img.image} alt=""/>
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