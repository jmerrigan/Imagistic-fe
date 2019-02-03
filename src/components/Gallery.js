import React, { Component } from 'react';
import Navbar from './Navbar';
import '../styles/Gallery.css';

class Gallery extends Component {

  state ={
    tagSelected: null
  }

  // this function will update the prop.selectedAlbumOption value to a new value when clicked
  // then passes the value back to App.js
  handleClick = (e) => {
    this.props.selectedAlbumOption(e.target.id)
    this.setState({ selectedAlbum: e.target.id })
  }

  render() {
    const { fullImgArray, imgArr1, imgArr2 } = this.props
    const { selectedAlbum } = this.state
    let albumsArray = []
    let tagsArray = []
    if (imgArr1) {

      // maps through the whole array of images to get all the albums
      fullImgArray.map(img => {
        for (let i = 0; i < img.album.length; i++) {
          albumsArray.push(img.album[i])
        }
      })

      // maps through both image array 1 and image array 2 to get all the tags
      imgArr1.map(img => {
        for (let i = 0; i < img.tags.length; i++) {
          tagsArray.push(img.tags[i])
        }
      })
      imgArr2.map(img => {
        for (let i = 0; i < img.tags.length; i++) {
          tagsArray.push(img.tags[i])
        }
      })

      // filters through the arrays and returns the unique values inside
      var uniqueAlbums = [...new Set(albumsArray)];
      var uniqueTags = [...new Set(tagsArray)]
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

            {/* maps through all the different album names and prints them out */}
            {uniqueAlbums.map(album => {
              return (
                <>
                  {/* p elements contains a onclick function to update the props to the value of the clicked id */}
                  {/* maps through the tags to display when the album is clicked */}
                  <p id={album} onClick={this.handleClick}>{album}</p>
                  {selectedAlbum == album && uniqueTags.map(tag => {
                    return <span id={tag}>{tag}</span>
                  })
                  }
                </>
              )
            })}
          </div>

          {/* maps through both image arrays to to display all the pictures within */}
          {/* each array is its own column */}
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