import React, { useReducer } from "react";
import {
     REGISTER_SUCCESS,
     REGISTER_FAIL,
     USER_LOADED,
     AUTH_ERROR,
     LOGIN_SUCCESS,
     LOGIN_FAIL,
     LOGOUT,
     CLEAR_ERRORS
} from "../types";
import authReducer from "./authReducer";
import AuthContext from "./authContext";

const AuthState = props => {
     
     const INITIAL_STATE = {
          user: null,
          token: localStorage.getItem("token"),
          isAuthenticated: null,
          loading: true,
          error: null
     };

     const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

     // Actions:
     
     // Load User (which user is logged in)

     // Register User

     // Login User

     // Logout User

     // Clear Errors
     return(
          <AuthContext.Provider 
          value={{
               user: state.user,
               token: state.token,
               isAuthenticated: state.isAuthenticated,
               loading: state.loading,
               error: state.error
          }}
          >
               {props.children}
          </AuthContext.Provider>
     )
}
export default AuthState;