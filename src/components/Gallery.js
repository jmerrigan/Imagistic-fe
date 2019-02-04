import React, { Component } from 'react';
import Navbar from './Navbar';
import '../styles/Gallery.css';

class Gallery extends Component {

  state ={
    tagSelected: null,
    selectedTagsArray: []
  }

  // this function will update the prop.selectedAlbumOption value to a new value when clicked
  // then passes the value back to App.js
  handleClick = (e) => {
    this.props.selectedAlbumOption(e.target.id)
    this.setState({ selectedAlbum: e.target.id })
  }

  tagHandler = (e) => {
    const { selectedTagsArray } = this.state
    const result = selectedTagsArray.findIndex( tag => tag === e.target.id );
    if (selectedTagsArray.find(tag => tag == e.target.id)) {
      selectedTagsArray.splice(result, 1)
    } else {
      selectedTagsArray.push(e.target.id)
    }
    this.props.tagFilter(selectedTagsArray)
  }

  

  lightboxClick = (e) => {
    const element = e.target
    const elementID = element.getAttribute('id')
    const lightboxImg = document.getElementById('lightbox-image')
    const lightbox = document.getElementById('lightbox-overlay')
    const newImg = new Image();

    if (element.hasAttribute('data-lightbox')) {
      e.preventDefault();
      newImg.onload = function() {
        lightboxImg.src = this.src;
      }
      lightboxImg.src = "";
      newImg.src = element.getAttribute('data-lightbox');
      lightbox.classList.add('visible');
    }

    if (elementID == 'lightbox-image' || elementID == 'lightbox-overlay') {
      e.preventDefault();
      lightbox.classList.remove('visible');
    }
  }

  render() {
    const { fullImgArray, imgArray, albumResult } = this.props
    const { selectedAlbum } = this.state
    let albumsArray = []
    let tagsArray = []
    if (imgArray) {

      // maps through the whole array of images to get all the albums
      fullImgArray.map(img => {
        for (let i = 0; i < img.album.length; i++) {
          albumsArray.push(img.album[i])
        }
      })

      // maps through albumResult to get all the tags
      if (albumResult) {
        albumResult.map(img => {
          for (let i = 0; i < img.tags.length; i++) {
            tagsArray.push(img.tags[i])
          }
        })
      }

      // filters through the arrays and returns the unique values inside
      var uniqueAlbums = [...new Set(albumsArray)];
      var uniqueTags = [...new Set(tagsArray)]
    }


    if(imgArray) {
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

            {/* maps through all the different album names and prints them out */}
            {uniqueAlbums.map(album => {
              return (
                <>
                  {/* p elements contains a onclick function to update the props to the value of the clicked id */}
                  {/* maps through the tags to display when the album is clicked */}
                  <p id={album} onClick={this.handleClick} key={album}>{album}</p>
                  {selectedAlbum == album && uniqueTags.map((tag, index) => {             
                    return (
                      <>
                        <label>{tag}</label>
                        <input type="checkbox" name="tags" id={tag} onChange={this.tagHandler} key={index}/>
                      </>
                    )
                  })
                  }
                </>
              )
            })}
          </div>

          {/* maps through both image arrays to to display all the pictures within */}
          {/* each array is its own column */}
          <div className="column">
          {imgArray.map((img, index) => {
            return (
              <img src={img.image} id={index} onClick={ this.lightboxClick} data-lightbox={img.image} alt="" key={index}/>
            )
          })}
          </div>
          <div id="lightbox-overlay">
            <img src="" alt="Lightbox-image" title="Click anywhere to close"
            onClick={this.lightboxClick} id="lightbox-image"/> 
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