import React, { useReducer } from "react";
import axios from "axios";

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
     const loadUser = () => console.log("Load user");
     // Register User
     const register = async formData => {
          const config = {
               headers: {
                    "Content-Type": "application/json"
               }
          }
          try {
               const res = await axios.post("/api/users", formData, config);
               dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
               });
          }
           catch (error) {
               dispatch({
                    type: REGISTER_FAIL,
                    payload: error.response.data.msg //.msg from users router.post line45.
               });
          }
     }

     // Login User
     const login = () => console.log("Sign in user");

     // Logout User
     const logout = () => console.log("Sign out user");
     // Clear Errors
     const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

     return(
          <AuthContext.Provider 
          value={{
               user: state.user,
               token: state.token,
               isAuthenticated: state.isAuthenticated,
               loading: state.loading,
               error: state.error,
               register,
               loadUser,
               login,
               logout,
               clearErrors
          }}
          >
               {props.children}
          </AuthContext.Provider>
     )
}
export default AuthState;