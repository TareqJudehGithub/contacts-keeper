import React, { useReducer } from "react";
import {v4 as uuidv4} from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "../types";
import AlertContext from './alertContext';
import alertReducer from "./alertReducer";

const AlertState = props => {
     // const INITIAL_STATE = [];
     const INITIAL_STATE = {
          alerts: []
     }

     const [state, dispatch] = useReducer(alertReducer, INITIAL_STATE);

     // Actions:

     //Set Alert
     const setAlert = (msg, type, timeout = 3000) => {

          const id =  uuidv4(); 
          dispatch({
               type: SET_ALERT,
               payload: { msg, type, id }
          });
          setTimeout(() => 
          dispatch({ type: REMOVE_ALERT, payload: id  }), timeout) // payload: id to determine which ID to remove.
     }

     // Remove Alert

     return(
          <AlertContext.Provider 
          value={{
               // alerts: state,
               alerts: state.alerts,
               setAlert
          }}
          >
               {props.children}
          </AlertContext.Provider>
     )
};

export default AlertState;