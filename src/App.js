import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Axios from 'axios';
import AboutMe from './components/About';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
import Home from './components/Home';
import Login from './components/Login';
import ManageImages from './components/ManageImages'
import Upload from './components/Upload'

Axios.defaults.withCredentials = true;



class App extends Component {
  state = {
    imgArray: null,
    fullImgArray: null
  }

  componentDidMount() {
    Axios.get(process.env.REACT_APP_BE_URL + "photos")
      .then(resp => {
        this.setState({ fullImgArray: resp.data, selectedAlbumImages: resp.data })
        const { selectedAlbumImages } = this.state
        const imgCount = selectedAlbumImages.length
        const imgArray =[]

        // split the data into 2 arrays which will them be used to display our pictures in 2 columns on the gallery page
        for (let i = 0; i < imgCount;) {
          if (i < imgCount) {
            imgArray.push(selectedAlbumImages[i])
            i++
          }
        }
        this.setState({ imgArray })
      })
  }


  // this function recieves a new value from Gallery.js when it is triggered
  handleAlbumSelection = (e) => {
    this.setState({ selectedAlbumOption: e }, () => {
      const { selectedAlbumOption, fullImgArray } = this.state
      const albumList = []

      if (e !== null) {

        // filter through the full image array to get back pictures with the same matching value
  
        fullImgArray.map(img => img.album.map(album => {
          if (album.includes(selectedAlbumOption)) {
            albumList.push(img)
          }
        }))
  
        // const albumResult = fullImgArray.filter(img => img.album == selectedAlbumOption)
        const imgCount = albumList.length
        const imgArray =[]
  
          // splits the array into 2 seprate arrays which we use to display our images in 2 columns
        for (let i = 0; i < imgCount;) {
          if (i < imgCount) {
            imgArray.push(albumList[i])
            i++
          }
        }
        this.setState({ imgArray, albumSelectedArray: albumList })

      } else {
        const { selectedAlbumImages } = this.state
        const imgCount = selectedAlbumImages.length
        const imgArray =[]

        for (let i = 0; i < imgCount;) {
          if (i < imgCount) {
            imgArray.push(selectedAlbumImages[i])
            i++
          }
        }
        this.setState({ imgArray })
      }

    })
  }

  handleTags = (e) => {
    const tagResults = []
    const { albumSelectedArray } = this.state
    const imgTagArray = []

    if (e[0] === undefined) {
      const imgCount = albumSelectedArray.length
      const imgArray = []
      for (let i = 0; i < imgCount; i++) {
        imgArray.push(albumSelectedArray[i])
      }
      this.setState({ imgArray })
    } else {
      e.map(tags => {
        albumSelectedArray.map(album => {
          if (album.tags.includes(tags)) {
            tagResults.push(album)
          }
        })
        }
      )
      const uniqueTags = [...new Set(tagResults)]
      
      
  
      const imgCount = uniqueTags.length
      for (let i = 0; i < imgCount;) {
        if (i < imgCount) {
          imgTagArray.push(uniqueTags[i])
          i++
        }
      }
  
      this.setState({ imgArray: imgTagArray })
    }
  }



  render() {
    const { fullImgArray, imgArray, albumSelectedArray } = this.state
    return (

      // setting different routes to load different components using react-router-dom
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />

          {/* passing props through to the gallery component */}
          <Route 
          exact path="/gallery"
          render={props => <Gallery {...props} fullImgArray={fullImgArray} imgArray={imgArray} selectedAlbumOption={this.handleAlbumSelection} tagFilter={this.handleTags} albumResult={albumSelectedArray} />}
          />
          <Route exact path="/about" component={AboutMe} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/admin/login" component={Login} />
          <Route 
          exact path="/admin/manage"
          render={props => <ManageImages {...props} fullImgArray={fullImgArray} imgArray={imgArray} selectedAlbumOption={this.handleAlbumSelection} tagFilter={this.handleTags} albumResult={albumSelectedArray} />}
          />
          <Route 
          exact path="/admin/upload" 
          render={props => <Upload {...props} fullImgArray={fullImgArray} />}
          />
        </div>
      </BrowserRouter>
    )

  }
}

export default App;
