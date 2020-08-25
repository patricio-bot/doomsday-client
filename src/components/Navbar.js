import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from '../lib/AuthProvider';

class Navbar extends Component {
  render() {
    // const { user, logout, isLoggedin } = this.props;
    const { user, logout, isLoggedin } = this.props;
    return (

      <nav className='navbar'>

        {isLoggedin ?
          (<>
            <Link to='/edit' className="fas fa-user-cog"></Link>

            <i className="fas fa-book-dead"></i>
            <Link className='fas fa-fire' to={`/user/${user._id}`} id='dashboard-btn'>

            </Link>
            <Link className="fas fa-balance-scale-right" to={'/user'}></Link>
            {/* <i className="fas fa-balance-scale-right"></i> */}
            <i className="fas fa-sign-out-alt" onClick={logout}></i>
          </>) : (
            <>
              <Link className='fas fa-fire' to={"/"} id='home-btn'>

              </Link>
            </>
          )
        }
      </nav>
    );
  }
}

export default withAuth(Navbar);
