import React, { Component, Fragment } from "react";
import { withAuth } from '../lib/AuthProvider';
import Navbar from "../components/Navbar";

class Login extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    //console.log('Login -> form submit', { email, password });
    this.props.login({ email, password });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <Fragment>
        <Navbar />
        <div className="wrapper">
          <div className="main">
            <div className="form-bg">
              <div className='form-container'>

                <h1 className="form-title login-title">Login</h1>

                <form className="form login-form" onSubmit={this.handleFormSubmit}>
                  <div className="form-group">
                    <input className="form-input login-input" type="text" name="email" value={email} onChange={this.handleChange} placeholder="Email" />
                    <label className="form-label">Email</label>
                  </div>
                  <div className="form-group">

                    <input className="form-input login-input" type="password" name="password" value={password} onChange={this.handleChange} placeholder="*****" />
                    <label className="form-label">Password</label>
                  </div>
                  <div className="form-group">
                    <button className="btn btn-after">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withAuth(Login);
