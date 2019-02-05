import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminHeader.css';

class AdminHeader extends Component {
    render () {
        return(
            <>
                <div className="adminLinkContainer">
                    <Link to="/admin/upload" className="adminLinks">UPLOAD</Link>
                    <Link to="/admin/manage" className="adminLinks">MANAGE</Link>
                    <div className="logoutContainer"><Link to="" className="logout">LOGOUT</Link>
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