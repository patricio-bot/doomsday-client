import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";

import Signup from './pages/Signup';
import Login from './pages/Login';
import Private from './pages/Private';
import AuthProvider from "./lib/AuthProvider";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/home/Home";

class App extends Component {
  render() {
    return (
      <AuthProvider>



        <Switch>
          <Route exact path='/' component={Home} />
          <AnonRoute path='/signup' component={Signup} />
          <AnonRoute path='/login' component={Login} />
          <PrivateRoute path='/private' component={Private} />

        </Switch>

      </AuthProvider>
    );
  }
}

export default App;
