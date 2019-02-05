import React, { Component } from 'react';
import axios from 'axios';
import Gallery from './Gallery';

axios.defaults.withCredentials = true;



class ManageImages extends Component {

  state = {}

  render() {
    return (
      <h1>Manage images apge</h1>
    )
  }
}

export default ManageImages;