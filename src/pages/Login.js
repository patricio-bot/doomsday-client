import React, { Component, Fragment } from "react";
import { withAuth } from '../lib/AuthProvider';
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Alert from "../components/layout/Alert";



class Login extends Component {

  state = {
    email: "",
    password: "",
    alert: null
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    //console.log('Login -> form submit', { email, password });
    //this.props.login({ email, password });
    if (Object.values(this.state).some((el) => el === '')) {
      this.setAlert('All fields are required', 'danger')
    } else {
      this.props.login({ email, password });
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  }

  render() {
    const { email, password } = this.state;

    return (
      <Fragment>
        <Navbar />
        <div className="wrapper">
          <div className="main">
            <div className="form-bg">
              <div className='form-container login-container'>

                <h1 className="form-title login-title">Login</h1>

                <form className="form login-form" onSubmit={this.handleFormSubmit}>
                  <Alert alert={this.state.alert} setAlert={this.setAlert} />
                  <div className="form-group">
                    <input className="form-input login-input" type="text" name="email" value={email} onChange={this.handleChange} placeholder="Email" />
                    <label className="form-label">Email</label>
                  </div>
                  <div className="form-group">

                    <input className="form-input login-input" type="password" name="password" value={password} onChange={this.handleChange} placeholder="*****" />
                    <label className="form-label">Password</label>
                  </div>
                  <div className="form-group">
                    <button className="btn btn-after btn-big">Login</button>
                  </div>
                </form>
                <div className="para-control"> <p className="para-form">Don't have an account?</p>
                  <Link className="link-to" to={"/signup"}> Sign Up</Link></div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withAuth(Login);
