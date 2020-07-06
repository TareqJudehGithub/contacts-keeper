import React, {useContext} from 'react';
import AuthContext from "../../context/auth/authContext";
import { Route, Redirect } from "react-router-dom";

const SignedIn = ({ component: Component, ...rest }) => {

     const authContext = useContext(AuthContext);
     const { isAuthenticated, loading} = authContext;

     return (
          <Route 
               {...rest} 
               render={props =>
                    isAuthenticated 
                    ?
                    (
                         <Redirect to="/login" />
                    )
                    :
                    (
                         <Component {...props}/>
                    )
               }
          />
          
     )
};

export default SignedIn;
