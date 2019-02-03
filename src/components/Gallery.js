import React, { Component } from 'react';
import Navbar from './Navbar';
import '../styles/Gallery.css';
// import { throws } from 'assert';

class Gallery extends Component {

  state ={
    tagSelected: null
  }

  handleClick = (e) => {
    this.props.selectedAlbumOption(e.target.id)
    this.setState({ selectedAlbum: e.target.id })
  }

  render() {
    const { fullImgArray, imgArr1, imgArr2 } = this.props
    let albumsArray = []
    let tagsArray = []
    if (imgArr1) {
      fullImgArray.map(img => {
        for (let i = 0; i < img.album.length; i++) {
          albumsArray.push(img.album[i])
        }
      })
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
                  <p id={album} onClick={this.handleClick}>{album}</p>
                  {this.state.selectedAlbum == album && uniqueTags.map(tag => {
                    <span id={album}>{tag}</span>
                  })
                  }
                </>
              )
            })}
          </div>

          {/* maps through both image arrays to to display all the pictures within */}
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