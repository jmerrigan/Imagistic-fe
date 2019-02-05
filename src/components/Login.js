import React, { Component } from 'react';
import axios from "axios";
import AdminHeader from './AdminHeader';
import '../styles/login.css'

axios.defaults.withCredentials = true;


class Login extends Component {
state = {}

handleInput = (e) => {
  const { value, id } = e.currentTarget;
  this.setState({ [id]: value });
}

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