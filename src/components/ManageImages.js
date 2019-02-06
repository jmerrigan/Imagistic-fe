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



  // Album related functions
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

  deleteAlbumRecord = (e) => {
    const { selectedAlbumArray } = this.state
    const albumIndex = e.target.id
    selectedAlbumArray.splice(albumIndex)
    this.setState({ selectedAlbumArray })
  }

  addAlbum = (e) => {
    e.preventDefault()
    const currentAlbum = this.state.album
    if (currentAlbum) {
      this.setState({
        selectedAlbumArray: [ ...this.state.selectedAlbumArray, currentAlbum ]
      })
      this.setState({ album: '' })
    }
  };

  addExisitingAlbum = (e) => {
    e.preventDefault()
    const { albumList } = this.state
    if (albumList) {
      this.setState({ 
        selectedAlbumArray: [ ...this.state.selectedAlbumArray, albumList]
       })
    }
  }
  

  
  
  // Tag related functions
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
  
  deleteTagRecord = (e) => {
    const { tagArray } = this.state
    const tagIndex = e.target.id
    tagArray.splice(tagIndex)
    this.setState({ tagArray })
  }

  addTag = (e) => {
    e.preventDefault()
    const currentTag = this.state.tag
    if (currentTag) {
      this.setState({
        tagArray: [ ...this.state.tagArray, currentTag ]
      })
      this.setState({ tag: '' })
    }
  };
  
  
  
  // Disable right click on images
  disableMenu = (e) => {
    e.preventDefault();
  }
  
  
  // record any changes to input boxes
  handleInput = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value });
  }
  
  // function used for selecting exisiting albums
  handleSelection = (e) => {
    const albumList = e.target.value
    this.setState({ albumList })
  }


  // CRUD functions 
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

    this.setState({ title: img.title, description: img.description, editID: img._id, selectedAlbumArray: img.album, tagArray: img.tags })
    console.log(formDescription)
    formTitle.value = img.title
    formDescription.value = img.description
    formID.classList.add('visible')

  }

  submitEdit = (e) => {
    e.preventDefault()
    const { title, description, editID, selectedAlbumArray, tagArray } = this.state
    const tags = tagArray
    const album = selectedAlbumArray
    console.log(description);
    const url = process.env.REACT_APP_BE_URL + `auth/photo/${editID}`
    axios.patch(url, {title, description, album, tags})
      .then(res => {
        console.log(res)
        window.location.reload()
      })
      .catch(err => console.log(err))
  };

  closeEdit = (e) => {
    e.preventDefault();
    const formID = document.getElementById('editFormContainer')
    formID.classList.remove('visible')
  }




  render() {
    const { fullImgArray, imgArray, albumResult } = this.props
    const { currentAlbumSelected, tagArray, selectedAlbumArray } = this.state
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
        <AdminHeader history={this.props.history} />
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

              {/* TITLE */}
              <label className="uploadFormLabels">Title : </label>
              <br />
              <input id="title" name="title" onChange={this.handleInput} type="text" className="uploadFormInputs"/>
              <br/>


              {/* DESCRIPTION */}
              <label className="uploadFormLabels">Description : </label>
              <br />
              <textarea id="description" name="description" onChange={this.handleInput}></textarea>
              <br/>


              {/* ALBUMS */}
              {/* showing all albums */}
              <label>Selected Albums : </label>
              {selectedAlbumArray && selectedAlbumArray.map((album, index) => {
                return <span className="tagSpan" id={index} onClick={this.deleteAlbumRecord} id="allAlbums">{album}</span>
              })}
              <br/>

              {/* creating new album */}
              <label className="uploadFormLabels">Create New Album</label>
              <br/>
              <input type="text" name="album" id="album" onChange={this.handleInput} value={this.state.album}/>
              <button onClick={this.addAlbum} id="albumSubmit">+</button>
              <br/>

              {/* selecting from previous albums */}
              <label className="uploadFormLabels">Select From Existing Albums</label>
              <br/>
              <select name="albumList" id="albumList" onChange={this.handleSelection}>
                <option disabled selected value> -- select an option -- </option>
                {uniqueAlbums && uniqueAlbums.map(album => {
                  return <option>{album}</option>
                })}
              </select>
              <button onClick={this.addExisitingAlbum} id="albumSubmit">+</button>
              <br/>


              {/* TAGS */}
              <label className="uploadFormLabels">Tags : </label>
              {tagArray && tagArray.map((tag, index) => {
                return <span className="tagSpan" id={index} onClick={this.deleteTagRecord}>{tag}</span>
              })}
              <br />

              {/* add new tags */}
              <label className="uploadFormLabels">Add New Tag:</label>
              <br/>
              <input className="uploadFormInputs" id="tag" onChange={this.handleInput} value={this.state.tag} name="Tags"/>
              
              <button onClick={this.addTag} id="tagSubmit">+</button>
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