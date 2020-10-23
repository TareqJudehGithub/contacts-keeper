import {
     REGISTER_SUCCESS,
     REGISTER_FAIL,
     USER_LOADED,
     AUTH_ERROR,
     LOGIN_SUCCESS,
     LOGIN_FAIL,
     LOGOUT,
     CLEAR_ERROR
} from "../types";

const authReducer = (state, action) => {
     
     switch(action.type){
          case USER_LOADED:
               return {
                    ...state,
                    isAuthenticated: true,
                    loading: false,
                    user: action.payload // user data
               }
          case LOGIN_SUCCESS:
          case REGISTER_SUCCESS:
               // storing the token we receive in localstorage:
               localStorage.setItem("token", action.payload.token);
               return {
                    ...state,
                    ...action.payload, // put the token in state
                    isAuthenticated: true,
                    loading: false
               }
          case LOGIN_FAIL:
          case AUTH_ERROR:
          case REGISTER_FAIL:
          case LOGOUT:
               // remove token if registration failed:
               localStorage.removeItem("token");
               return{
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    loading: true,
                    error: action.payload 
               }
          case CLEAR_ERROR:
               return{
                    ...state,
                    error: null
               }
          default:
               return state;
     }
};
export default authReducer;