import React from 'react';

import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const Navbar = ({ title, icon }) => {

     return (
          <div className="navbar bg-primary">
               <h1>
                    <Link to="/"><i className={icon}/></Link> {title}
               </h1>
               <ul>
                    <li>
                         <Link to="/">Home</Link>
                    </li>
                    <li>
                         <Link to="/about">About</Link>
                    </li>
                    <li>
                         <Link to="/register">Register</Link>
                    </li>
                    <li>
                         <Link to="/login">Sign in</Link>
                    </li>
               </ul>
          </div>
     )
}
Navbar.prototype = {
     title: PropTypes.string.isRequired,
     icon: PropTypes.string.isRequired
}

export default Navbar;
