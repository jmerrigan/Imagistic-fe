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
    var element = e.target
    console.log(e.target)
        // elementID = element.getAttribute('id')
        // lightboxImg = document.getElementById('lightbox-image')
        // lightbox = document.getElementById('lightbox-overlay')
        // newImg = new Image();
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

<<<<<<< HEAD
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
=======
>>>>>>> 24f0e4bd6331f263cc0d857b91ca25ecbc61b8d9

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
                    // return <span id={tag}>{tag}</span>


                    // return (
                    //   <>
                    //     <label>{tag}</label>
                    //     <input type="radio" name="tag" id={tag}/>
                    //   </>
                    // )
                    
                    return (
                      <>
                        <label>{tag}</label>
                        <input type="checkbox" name="tags" id={tag} onChange={this.tagHandler}/>
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