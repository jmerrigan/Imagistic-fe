import React, { Component } from 'react';
import '../styles/upload.css';
import DashSidebar from './DashSidebar';
import AdminHeader from './AdminHeader';
import axios from 'axios';
axios.defaults.withCredentials = true;


class Upload extends Component {
  state = {
    tagArray: [],
    selectedAlbumArray: []
  };

  componentDidMount() {
    const logInCheckUrl = process.env.REACT_APP_BE_URL + "auth/userloggedin"
    axios.get(logInCheckUrl)
      // .then(res => res.send("Hi"))
      .catch(err => this.props.history.push('/admin/login'))
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

  handleInput = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value });
  }

  handleSelection = (e) => {
    const albumList = e.target.value
    this.setState({ albumList })
  }

  submitForm = (e) => {
    e.preventDefault();
    const data = new FormData();
    const url = process.env.REACT_APP_BE_URL + "auth/photo/upload"
    const { tagArray, title, description, selectedAlbumArray } = this.state
    console.log(e.target.myImage.files[0])
    data.append('file', e.target.myImage.files[0]);
    data.append('tagArray', tagArray);
    data.append('title', title);
    data.append('description', description);
    data.append('selectedAlbumArray', selectedAlbumArray);
    axios.post(url, data)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    console.log(tagArray)
  };

  deleteAlbumRecord = (e) => {
    const { selectedAlbumArray } = this.state
    const albumIndex = e.target.id
    selectedAlbumArray.splice(albumIndex)
    this.setState({ selectedAlbumArray })
  }

  deleteTagRecord = (e) => {
    const { tagArray } = this.state
    const tagIndex = e.target.id
    tagArray.splice(tagIndex)
    this.setState({ tagArray })
  }

  render() {
    const { tagArray, albumArray, selectedAlbumArray } = this.state

    const { fullImgArray, imgArray, albumResult } = this.props
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
          <AdminHeader/>
          <DashSidebar/>
        
        <form onSubmit={this.submitForm} className="uploadForm" encType="multipart/form-data">

          {/* FILE UPLOAD */}
          <label className="uploadFormLabels">Select Image to Upload</label>
          <br/>
          <input type="file" name="myImage" id="myImage" accept="image/*" className="uploadFormInputs"/>
          <br/>


          {/* TITLE */}
          <label className="uploadFormLabels">Title : </label>
          <br/>
          <input id="title" name="title" onChange={this.handleInput} type="text" className="uploadFormInputs"/>
          <br/>


          {/* DESCRIPTION */}
          <label className="uploadFormLabels">Description : </label>
          <br/>
          <textarea id="description" name="description" onChange={this.handleInput} rows="8" cols="60" ></textarea>
          <br/>


          {/* ALBUMS */}
          <label>Selected Albums : </label>
          {selectedAlbumArray && selectedAlbumArray.map((album, index) => {
            return <span className="tagSpan" id={index} onClick={this.deleteAlbumRecord}>{album}</span>
          })}
          <br/>
          <label className="uploadFormLabels">Create New Album</label>
          <br/>
          <input type="text" name="album" id="album" onChange={this.handleInput} value={this.state.album}/>
          <button onClick={this.addAlbum} id="albumSubmit">+</button>
          <br/>
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
          <input className="uploadFormInputs" id="tag" onChange={this.handleInput} value={this.state.tag} name="Tags"/>
          
          <button onClick={this.addTag} id="tagSubmit">+</button>
          <br/>
          <input type="submit" value="submit" id="sumbitForm" />

        </form> 
      </div>
    );
  }
}

export default Upload;