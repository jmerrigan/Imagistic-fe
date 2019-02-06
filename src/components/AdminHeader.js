import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminHeader.css';

axios.defaults.withCredentials = true;

class AdminHeader extends Component {
    
    logoutUser = (e) => {
        e.preventDefault();
        const url = process.env.REACT_APP_BE_URL + "auth/logout"
        axios.get(url)
            .then(res => {
                this.props.history.push('/admin/login')
            })
            .catch(err => console.log(err))
    };

    render () {
        return(
            <>
                <div className="adminLinkContainer">
                    <Link to="/admin/upload" className="adminLinks">UPLOAD</Link>
                    <Link to="/admin/manage" className="adminLinks">MANAGE</Link>
                    <div className="logoutContainer"><Link to="" className="logout" onClick={this.logoutUser}>LOGOUT</Link>
                    </div>
                </div>
                <div id="adminHeader">
                    <h1 id="adminLogo">IMAGISTIC ADMIN</h1>
                </div>
            </>
        )
    }
}

export default AdminHeader;