import React, { Component } from "react";
import { withAuth } from '../lib/AuthProvider';
import Navbar from "../components/Navbar";

class Private extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <h1>Welcome {this.props.user.firstName} {this.props.user.lastName}</h1>
      </div>
    );
  }
}

export default withAuth(Private);
