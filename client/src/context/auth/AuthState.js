import React, { useReducer } from "react";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken"; // global headers

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
     const loadUser = async() => {

          if(localStorage.token){
               setAuthToken(localStorage.token);
          }

          try {
               const res = await axios.get("/api/auth");  // auth MW from backend (JWT)

               dispatch({
                    type: USER_LOADED,
                    payload: res.data   //the actual user data
               });
          } 
          catch (error) {
               dispatch({
                    type: AUTH_ERROR
               })
          }
     }
   
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
               loadUser();
          }
           catch (error) {
               dispatch({
                    type: REGISTER_FAIL,
                    payload: error.response.data.msg 
               });
          }
     }

     // Login User
     const login = () => console.log("Load user");

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