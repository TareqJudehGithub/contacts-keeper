import React from 'react';

import { Switch, Route } from "react-router-dom";
import ContactState from "./context/contact/ContanctState";
import AuthState from "./context/auth/AuthState";

import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";


import './App.css';

const App = () => {
  return (
    <AuthState>
       <ContactState>
      <React.Fragment>
        <Navbar 
          title="Contact Keeper"
          icon="fas fa-id-card-alt"
        />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login}/>
          </Switch>
        </div>
      </React.Fragment>
    </ContactState>
    </AuthState>
   
  );
}

export default App;
