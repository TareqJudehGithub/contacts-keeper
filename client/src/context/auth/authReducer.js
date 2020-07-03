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

const authReducer = (state, action) => {
     switch(action.type){
          case REGISTER_SUCCESS:
               // storing the token we receive in localstorage:
               localStorage.setItem("token", action.payload.token);
               return {
                    ...state,
                    ...action.payload, // put the token in state
                    isAuthenticated: true,
                    loading: false
               }
          case REGISTER_FAIL:
               // remove token if registration failed:
               localStorage.removeItem("token");
               return{
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    loading: true,
                    error: action.payload // catch payload
               }
          case CLEAR_ERRORS:
               return{
                    ...state,
                    error: null
               }
          default:
               return state;
     }
}
export default authReducer;