import React from 'react';

import { Switch, Route } from "react-router-dom";
import ContactState from "./context/contact/ContanctState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import PrivateRoute from "./components/routing/PrivateRoute";
import SignedIn from "./components/routing/SignedIn";
import setAuthToken from "./utils/setAuthToken";

import './App.css';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {

  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <React.Fragment>
            <Navbar 
              title="Contact Keeper"
              icon="fas fa-id-card-alt"
            />
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <SignedIn exact path="/register" component={Register} />
                <Route exact path="/login" component={Login}/>
              </Switch>
            </div>
          </React.Fragment>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
