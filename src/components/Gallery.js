import React, { Component } from 'react';
import Navbar from './Navbar';
import '../styles/Gallery.css';

class Gallery extends Component {

  state ={
    tagSelected: null,
    selectedTagsArray: [],
    currentAlbumSelected: null,
    albumToggle: false
  }

  // this function will update the prop.selectedAlbumOption value to a new value when clicked
  // then passes the value back to App.js
  albumHandler = (e) => {
    const { currentAlbumSelected, albumToggle } = this.state
    // this.props.selectedAlbumOption(e.target.id)
    if (albumToggle === false && currentAlbumSelected === e.target.id) {
      this.setState({ albumToggle: true, currentAlbumSelected: e.target.id })
      this.props.selectedAlbumOption(e.target.id)
    }
    if (albumToggle === true && currentAlbumSelected === e.target.id) {
      this.setState({ albumToggle: false, currentAlbumSelected: null })
      this.props.selectedAlbumOption(null)
    }
    if (albumToggle === true && currentAlbumSelected !== e.target.id){
      this.setState({ currentAlbumSelected: e.target.id })
      this.props.selectedAlbumOption(e.target.id)
    }
    if (albumToggle === false && currentAlbumSelected !== e.target.id) {
      this.setState({ albumToggle: true, currentAlbumSelected: e.target.id })
      this.props.selectedAlbumOption(e.target.id)
    }
    // this.setState({ currentAlbumSelected: e.target.id })
  }

  // albumHandler = (e) => {
  //   const { currentAlbumSelected, albumToggle } = this.state
  //   const currentAlbumVariable = e.target.id
  //   if (currentAlbumVariable) {
  //     this.props.selectedAlbumOption(currentAlbumSelected)
  //     if (albumToggle === true && currentAlbumSelected !== currentAlbumVariable) {
  //       this.setState({ currentAlbumSelected: currentAlbumVariable })
  //     }
  //     if (albumToggle === false && currentAlbumSelected !== currentAlbumVariable) {
  //       this.setState({ albumToggle: true, currentAlbumSelected: currentAlbumVariable })
  //     }
  //     if (albumToggle === true && currentAlbumSelected === currentAlbumVariable) {
  //       this.setState({ albumToggle: false, currentAlbumSelected: currentAlbumVariable })
  //     }
  //     if (albumToggle === false && currentAlbumSelected === currentAlbumVariable) {
  //       this.setState({ albumToggle: true, currentAlbumSelected: currentAlbumVariable })
  //     }
  //     this.props.selectedAlbumOption(currentAlbumVariable)
  //   }
  // }

  tagHandler = (e) => {
    const { selectedTagsArray } = this.state
    const result = selectedTagsArray.findIndex( tag => tag === e.target.id );
    if (selectedTagsArray.find(tag => tag == e.target.id)) {
      selectedTagsArray.splice(result, 1)
    } else {
      selectedTagsArray.push(e.target.id)
    }
    this.props.tagFilter(selectedTagsArray)
    console.log(selectedTagsArray)
  }

  disableMenu = (e) => {
    e.preventDefault();
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
    const { currentAlbumSelected } = this.state
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

            {/* maps through all the different album names and prints them out */}
            {uniqueAlbums.map(album => {
              return (
                <>
                  {/* p elements contains a onclick function to update the props to the value of the clicked id */}
                  {/* maps through the tags to display when the album is clicked */}
                  <p id={album} onClick={this.albumHandler} key={album} className="albumFilter">{album}</p>
                  {currentAlbumSelected == album && uniqueTags.map((tag, index) => {             
                    return (
                      <div className="tagContainer">
                        <div className="tagFilter">
                          <label>{tag}</label>
                          <input type="checkbox" name="tags" id={tag} onChange={this.tagHandler} key={index}/>
                        </div>
                      </div>
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
              <img src={img.image} id={index} onClick={ this.lightboxClick} data-lightbox={img.image} onContextMenu={this.disableMenu} alt="" key={index}/>
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
      return <h1 id="loading">Loading...</h1>
    }
   
  }
}
export default Gallery;