import React, { Component } from 'react';
import axios from "axios";
import '../styles/login.css'

axios.defaults.withCredentials = true;


class Login extends Component {
  state = {}

  componentDidMount() {

    // sends a request to the server, and the server will check for cookies to see if the user has an existing session
    // if user has logged in and has a session, they will be redirected to the upload page/component
    const logInCheckUrl = process.env.REACT_APP_BE_URL + "auth/userloggedin"
    axios.get(logInCheckUrl)
      .then(res => this.props.history.push('/admin/upload'))
      .catch(err => console.log('Need to sign in'))
  };

  // keeps track of what has been inputted, used for the username and password field
  handleInput = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value });
  }

  // sends a request to the server and check if user exists in the database
  // if user exists, create a session for them, and redirects then to the upload page/component
  // if user doesnt exist, display an error message
  handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const url = process.env.REACT_APP_BE_URL + "auth/login"
    axios.post(url, { username, password })
      .then(res => {
        this.setState({ error: null })
        this.props.history.push('/admin/upload')
      })
      .catch(err => this.setState({ error: "Invalid username/password, please try again" }))
  };

  render() {
    const { error } = this.state
    return (
      <div className="loginPage">
        <h1>IMAGISTIC ADMIN</h1>
          <div className="titleLine">
          </div>
        <form className="loginForm" action="">                  
          <input type="text" id="username" placeholder='USERNAME' onChange={this.handleInput}/>
          <br/>
          <br/>        
          <input type="password" id="password" placeholder='PASSWORD' onChange={this.handleInput}/>
          <br/>
          <input type="submit" value="Login" id="loginButton" onClick={this.handleLogin}/>
        </form>
      {error && <p id="errorMessage">{error}</p>}



      </div>
    );
  }
}

export default Login;