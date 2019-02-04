import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Axios from 'axios';

import './App.css';
import AboutMe from './components/About';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
import Home from './components/Home';
import Login from './components/Login';
import ManageImages from './components/ManageImages'
import Upload from './components/Upload'



class App extends Component {
  state = {
    // background: [ 
    //   'https://res.cloudinary.com/dx0fhazu1/image/upload/v1548302393/divine_light.jpg',
    //   'https://res.cloudinary.com/dx0fhazu1/image/upload/v1548302393/Pelican_Study.jpg',
    //   'https://res.cloudinary.com/dx0fhazu1/image/upload/v1548302393/_MG_5366.jpg',
    //   'https://res.cloudinary.com/dx0fhazu1/image/upload/v1548302393/Theres_a_Sunset_Somewhere_x_3.jpg',
    //   'https://res.cloudinary.com/dx0fhazu1/image/upload/v1548302393/Ignored.jpg',
    //   'https://images.pexels.com/photos/54200/pexels-photo-54200.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    //   'https://images.pexels.com/photos/1559117/pexels-photo-1559117.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    //   'https://images.pexels.com/photos/730256/pexels-photo-730256.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    //   'https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    //   'https://images.pexels.com/photos/830891/pexels-photo-830891.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    //   'https://images.pexels.com/photos/342113/pexels-photo-342113.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    //   'https://images.pexels.com/photos/66187/pexels-photo-66187.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    //   'https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    //   'https://images.pexels.com/photos/678725/pexels-photo-678725.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'


    // ],
    imgArr1: null,
    imgArr2: null,
    fullImgArray: null
  }

  componentDidMount() {

    // when component mounts, it will go and grab data from the route using Axios
    Axios.get('http://localhost:5000/photos')
      .then(resp => {
        this.setState({ fullImgArray: resp.data, selectedAlbumImages: resp.data })
        const { selectedAlbumImages } = this.state
        const imgCount = selectedAlbumImages.length
        const imgArr1 =[]
        const imgArr2 =[]

        // split the data into 2 arrays which will them be used to display our pictures in 2 columns on the gallery page
        for (let i = 0; i < imgCount;) {
          if (i < imgCount) {
            imgArr1.push(selectedAlbumImages[i])
            i++
          }
          if (i < imgCount) {
            imgArr2.push(selectedAlbumImages[i])
            i++
          }
        }
        this.setState({ imgArr1, imgArr2 })
      })
  }


  // this function recieves a new value from Gallery.js when it is triggered
  handleAlbumSelection = (e) => {
    this.setState({ selectedAlbumOption: e }, () => {
      const { selectedAlbumOption, fullImgArray } = this.state

      // filter through the full image array to get back pictures with the same matching value
      const albumResult = fullImgArray.filter(img => img.album == selectedAlbumOption)
        const imgCount = albumResult.length
        const imgArr1 =[]
        const imgArr2 =[]

        // splits the array into 2 seprate arrays which we use to display our images in 2 columns
        for (let i = 0; i < imgCount;) {
          if (i < imgCount) {
            imgArr1.push(albumResult[i])
            i++
          }
          if (i < imgCount) {
            imgArr2.push(albumResult[i])
            i++
          }
        }
        this.setState({ imgArr1, imgArr2, albumResult })
    })
  }

  handleTags = (e) => {
    // console.log(e)
    const recievedTagArray = e
    // const { albumResult } = this.state
    // const tagFilterArray = albumResult.filter(img => img.tag == recievedTagArray)
    // console.log(tagFilterArray)
  }



  render() {
    const { fullImgArray, imgArr1, imgArr2 } = this.state
    return (

      // setting different routes to load different components using react-router-dom
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />

          {/* passing props through to the gallery component */}
          <Route 
          exact path="/gallery"
          render={props => <Gallery {...props} fullImgArray={fullImgArray} imgArr1={imgArr1} imgArr2={imgArr2} selectedAlbumOption={this.handleAlbumSelection} tagFilter={this.handleTags} />}
          />
          <Route exact path="/about" component={AboutMe} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/admin/login" component={Login} />
          <Route exact path="/admin/upload" component={Upload} />
          <Route exact path="/admin/manage" component={ManageImages} />
        </div>
      </BrowserRouter>
    )

  }
}

export default App;
