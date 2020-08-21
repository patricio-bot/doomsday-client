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
            <p className='navbar-user'>{user.firstName} {user.lastName}</p>
            {/* <button className='fas fa-sign-out-alt' onClick={logout}>Logout</button> */}
            <i class="fas fa-sign-out-alt" onClick={logout}></i>
          </>
        }
      </nav>
    );
  }
}

export default withAuth(Navbar);
