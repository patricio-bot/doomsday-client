import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";



import Signup from './pages/Signup';
import Login from './pages/Login';
import Private from './pages/Private';
import AuthProvider from "./lib/AuthProvider";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/home/Home";

import UsersList from './pages/UsersList';
import UserDetails from "./pages/UserDetails";
import EditUser from "./pages/EditUser";

class App extends Component {
  render() {
    return (
      <AuthProvider>



        <Switch>

          <AnonRoute path='/signup' component={Signup} />
          <AnonRoute path='/login' component={Login} />
          <Route exact path='/' component={Home} />

          <PrivateRoute exact path='/private' component={Private} />
          <PrivateRoute exact path='/user' component={UsersList} />
          <PrivateRoute exact path='/user/:id' component={UserDetails} />
          <PrivateRoute exact path='/edit' component={EditUser} />
        </Switch>

      </AuthProvider>
    );
  }
}

export default App;
