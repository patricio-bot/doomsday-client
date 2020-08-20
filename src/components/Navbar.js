import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from '../lib/AuthProvider';

class Navbar extends Component {
  render() {
    // const { user, logout, isLoggedin } = this.props;
    const { user, logout, isLoggedin } = this.props;
    return (

      <nav className='navbar'>
        <Link className='fas fa-fire' to={"/"} id='home-btn'>

        </Link>
        {isLoggedin &&
          <>
            <p className='navbar-user'>username: {user.firstName} {user.lastName}</p>
            <button className='navbar-button' onClick={logout}>Logout</button>
          </>
        }
      </nav>
    );
  }
}

export default withAuth(Navbar);
