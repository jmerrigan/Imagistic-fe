import React, { Component } from 'react';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import '../styles/upload.css';
axios.defaults.withCredentials = true;


class Upload extends Component {
  state = {
    tagArray: [],
    selectedAlbumArray: []
  };

  componentDidMount() {

    // check if the user is logged in and has a session
    // if there is no session, redirect user to the login page
    const logInCheckUrl = process.env.REACT_APP_BE_URL + "auth/userloggedin"
    axios.get(logInCheckUrl)
      // .then(res => res.send("Hi"))
      .catch(err => this.props.history.push('/admin/login'))
  }

  // function that adds an album to the selectedAlbumArray
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

  // function that adds an album from a list of existing albums to the selectAlbumArray
  addExisitingAlbum = (e) => {
    e.preventDefault()
    const { albumList } = this.state
    if (albumList) {
      this.setState({ 
        selectedAlbumArray: [ ...this.state.selectedAlbumArray, albumList]
       })
    }
  }

  // function that adds a tag to the tagArray
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

  // function that keeps track of what is being inputted, used for creating a new tag and creating a new album
  handleInput = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value });
  }

  // function that keeps track of what is being selected, used for selecting from a existing album
  handleSelection = (e) => {
    const albumList = e.target.value
    this.setState({ albumList })
  }

  // submits the form to the server
  // refreshes the page upon success, other wise displays an error message
  submitForm = (e) => {
    e.preventDefault();
    const data = new FormData();
    const url = process.env.REACT_APP_BE_URL + "auth/photo/upload"
    const { tagArray, title, description, selectedAlbumArray } = this.state
    data.append('file', e.target.myImage.files[0]);
    data.append('tagArray', tagArray);
    data.append('title', title);
    data.append('description', description);
    data.append('selectedAlbumArray', selectedAlbumArray);
    axios.post(url, data)
      .then(res => window.location.reload())
      .catch(err => console.log(err))
  };

  // function that deletes an album from the selectedAlbumArray
  deleteAlbumRecord = (e) => {
    const { selectedAlbumArray } = this.state
    const albumIndex = e.currentTarget.id
    selectedAlbumArray.splice(albumIndex, 1)
    this.setState({ selectedAlbumArray })
  }

  // function that deletes a tag from the tagArray
  deleteTagRecord = (e) => {
    const { tagArray } = this.state
    const tagIndex = e.currentTarget.id
    tagArray.splice(tagIndex, 1)
    this.setState({ tagArray })
  }

  render() {
    const { tagArray, selectedAlbumArray } = this.state

    const { fullImgArray } = this.props
    let albumsArray = []
    if (fullImgArray) {

      // maps through the whole array of images to get all the albums
      fullImgArray.map(img => {
        for (let i = 0; i < img.album.length; i++) {
          albumsArray.push(img.album[i])
        }
      })

      // filters through the arrays and returns the unique values inside
      var uniqueAlbums = [...new Set(albumsArray)];
    }

    return (
      <div className="formContainer">
          <AdminHeader history={this.props.history} />
        <form onSubmit={this.submitForm} className="uploadForm" encType="multipart/form-data">

          {/* FILE UPLOAD */}
          
            <label className="uploadFormLabels" id="uploadLabel">Select Image to Upload : </label>
            
            <input type="file" name="myImage" id="myImage" accept="image/*" className="uploadFormInputs"/> 
      
            {/* TITLE */}
            <label className="uploadFormLabels" id="titleLabel" >Title : </label>
        
            <input id="title" name="title" onChange={this.handleInput} type="text" className="uploadFormInputs"/>
        
          {/* DESCRIPTION */}
          
            <label className="uploadFormLabels" id="descLabel">Description : </label>
            <textarea id="description" name="description" onChange={this.handleInput} rows="3" cols="60" ></textarea>


          {/* ALBUMS */}
            <label id="assignedAlbumLabel">Assigned Albums : </label>
            <div id="assignedAlbums">
            {selectedAlbumArray && selectedAlbumArray.map((album, index) => {
              return (
                <div className="albumCard" onClick={this.deleteAlbumRecord} id={index}>
                  <p className="albumPara">{album}</p>
                  <p className="delete">Delete</p>
                </div>
                )
            })}
            </div>
  
         
            <label className="uploadFormLabels" id="existingAlbumLabel">From Existing Albums : </label>
            
            <div id="albumDropAndButton">
            <select name="albumList" id="albumList" onChange={this.handleSelection}>
              <option disabled selected value> Select an Album </option>
              {uniqueAlbums && uniqueAlbums.map(album => {
                return <option>{album}</option>
              })}
            </select>
            <button onClick={this.addExisitingAlbum} id="albumSubmit">+</button>
            </div>
          
          <label className="uploadFormLabels" id="createAlbumLabel">Create New Album : </label>
          
          <div id="albumInputAndButton">
          <input type="text" name="album" id="album" onChange={this.handleInput} value={this.state.album}/>
          <button onClick={this.addAlbum} id="albumSubmit">+</button>
          </div>
        
          {/* TAGS */}
          <label className="uploadFormLabels" id="assignedTagsLabel">Assigned Tags : </label>
          <div id="assignedTags">
          {tagArray && tagArray.map((tag, index) => {
            return (
              <div className="tagCard" onClick={this.deleteTagRecord} id={index}>
                <p className="tagPara">{tag}</p>
                <p className="delete">Delete</p>
              </div>
            )
          })}
          </div>

          {/* add new tags */}
          
            <label className="uploadFormLabels" id="addTagLabel">Add New Tag :</label>
            <br/>
            <div id="tagInputAndButton">
            <input className="uploadFormInputs" id="tag" onChange={this.handleInput} value={this.state.tag} name="Tags"/>
            
            <button onClick={this.addTag} id="tagSubmit">+</button>
            </div>
          

          <input type="submit" value="Upload Photo" id="submitForm"/>

        </form> 
      </div>
    );
  }
}

export default Upload;