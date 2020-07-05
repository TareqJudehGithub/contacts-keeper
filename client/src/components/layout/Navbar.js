import React, { useContext } from 'react';

import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";


const Navbar = ({ title, icon, history } ) => {

     const authContext = useContext(AuthContext);
     const { isAuthenticated, logout, user } = authContext;

     const onLogout = event => {
          logout();
          history.push("/login");
     }

     const authLinks = (
          <React.Fragment>
               <li>
                    Hello, { user && user.name }
               </li>
               <li>
                   <a
                         onClick={onLogout}
                         href="#!"
                    >
                    <i className="fas fa-sign-out-alt" />{" "}
                         {/* hides text on sm screen devices */}
                         <span className="hide-sm">Logout</span>   
                  
                   </a>
               </li>
          </React.Fragment>
          );

          const guestLinks = (
               <React.Fragment>
               <li>
                    <Link to="/register">Register</Link>
               </li>
               <li>
                    <Link to="/login">Sign in</Link>
               </li>
          </React.Fragment>
          );
        
     return (
     
          <div className="navbar bg-primary">
               <h1>
                    <Link to="/"><i className={icon}/></Link> {title}
               </h1>
               <ul>
                   { isAuthenticated ? authLinks : guestLinks }
               </ul>
          </div>
     )
}
Navbar.prototype = {
     title: PropTypes.string.isRequired,
     icon: PropTypes.string.isRequired
}

export default withRouter(Navbar);
