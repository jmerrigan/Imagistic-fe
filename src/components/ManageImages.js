import React, { Component } from 'react';
import axios from 'axios';
import AdminHeader from './AdminHeader';


axios.defaults.withCredentials = true;



class ManageImages extends Component {

  state ={
    tagSelected: null,
    selectedTagsArray: [],
    currentAlbumSelected: null,
    albumToggle: false
  }

  

  // this function will update the prop.selectedAlbumOption value to a new value when clicked
  // then passes the value back to App.js

  componentDidMount() {
    const logInCheckUrl = process.env.REACT_APP_BE_URL + "auth/userloggedin"
    axios.get(logInCheckUrl)
      .then(res => console.log(res))
      .catch(err => this.props.history.push('/admin/login'))
  }

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
    console.log(selectedTagsArray)
  }

  disableMenu = (e) => {
    e.preventDefault();
  }

  handleInput = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value });
  }


  deleteImage = img => e => {
    console.log(img)
    const url = process.env.REACT_APP_BE_URL + `auth/photo/${img}`
    console.log(url)
    axios.delete(url)
      .then(res => window.location.reload())
      .catch(err => console.log(err))
  };

  editImage = img => e => {
    console.log(img)
    const formID = document.getElementById('editFormContainer')
    const formTitle = document.getElementById('title')
    const formDescription = document.getElementById('description')

    this.setState({title: img.title, description: img.description, editID: img._id})
    console.log(formDescription)
    formTitle.value = img.title
    formDescription.value = img.description
    formID.classList.add('visible')

  }

  submitEdit = (e) => {
    const { title, description, editID } = this.state
    console.log(description);
    const url = process.env.REACT_APP_BE_URL + `auth/photo/${editID}`
    axios.patch(url, {title, description})
      .then(res => console.log(res))
      .catch(err => console.log(err))
  };

  closeEdit = (e) => {
    e.preventDefault();
    const formID = document.getElementById('editFormContainer')
    formID.classList.remove('visible')
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
        <AdminHeader />
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
              <div className="managePhoto">
                <img src={img.image} id={index} onClick={ this.lightboxClick} data-lightbox={img.image} onContextMenu={this.disableMenu} alt="" key={index}/>
                <span><button onClick={this.editImage(img)}>Edit</button> <button onClick={this.deleteImage(img._id)}>Delete</button></span>
              </div>
            )
          })}
          </div>
          <div id="editFormContainer">
            <form id="editForm">
              <label className="uploadFormLabels">Title : </label>
              <br />
              <input id="title" name="title" onChange={this.handleInput} type="text" className="uploadFormInputs"/>
              <br/>
              <label className="uploadFormLabels">Description : </label>
              <br />
              <textarea id="description" name="description" onChange={this.handleInput}></textarea>
              <br/>
              <input type="submit" value="Submit" id="sumbitForm" onClick={this.submitEdit} />
              <button onClick={this.closeEdit}>Cancel</button>
            </form>
          </div>

        </div>
      </div>
    );
    } else {
      return <h1 id="loading">Loading...</h1>
    }
   
  }
}

export default ManageImages;