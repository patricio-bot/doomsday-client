import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { withAuth } from '../lib/AuthProvider';
import '../App.css';
import Alert from "../components/layout/Alert";
import Navbar from "../components/Navbar";

class Signup extends Component {
  state = { firstName: "", lastName: '', gender: '', email: '', password: "", alert: null };

  handleFormSubmit = event => {
    event.preventDefault();

    const { firstName, lastName, gender, email, password } = this.state;
    if (Object.values(this.state).some((el) => el === '')) {
      this.setAlert('All fields are required', 'danger')
    } else {
      this.props.signup({ firstName, lastName, gender, email, password });
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
    const { firstName, lastName, gender, email, password } = this.state;
    return (
      <Fragment>
        <Navbar />
        <div className="wrapper">
          <div className="main">
            <div className="form-bg">
              <div className='form-container'>
                <h1 className="form-title">Sign Up</h1>
                <form className="form" onSubmit={this.handleFormSubmit} >
                  <Alert alert={this.state.alert} setAlert={this.setAlert} />
                  <div className="form-group">
                    <input className="form-input" type="text" name="firstName" value={firstName} id="firstname-input" placeholder="First Name" onChange={this.handleChange} />
                    <label className="form-label" htmlFor="firstname-input">First Name</label>
                  </div>
                  <div className="form-group">
                    <input className="form-input" type="text" name="lastName" value={lastName} id="lastname-input" placeholder="Last Name" onChange={this.handleChange} />
                    <label className="form-label" htmlFor="lastname-input">Last Name</label>
                  </div>
                  <div className="form-group">
                    <input className="form-input" type="text" name="gender" value={gender} id="gender-input" placeholder="Gender" onChange={this.handleChange} />
                    <label className="form-label" htmlFor="gender-input">Gender</label>
                  </div>
                  <div className="form-group">
                    <input className="form-input" type="text" name="email" value={email} id="email-input" placeholder="Email" onChange={this.handleChange} />
                    <label className="form-label" htmlFor="email-input">Email</label>
                  </div>
                  <div className="form-group">
                    <input className="form-input" type="password" name="password" value={password} id="password-input" placeholder="*******" onChange={this.handleChange} />
                    <label className="form-label" htmlFor="password-input">Password</label>
                  </div>
                  <div className="form-group">
                    <button className="btn btn-after btn-big">Register</button>
                  </div>

                </form>
                <div className="para-control"> <p className="para-form">Already have an account?</p>
                  <Link className="link-to" to={"/login"}> Login</Link></div>

              </div>

            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withAuth(Signup);
