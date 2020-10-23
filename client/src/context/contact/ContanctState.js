import React, { useReducer } from "react";

import axios from "axios";

import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
     GET_CONTACTS, ADD_CONTACT,  UPDATE_CONTACT, DELETE_CONTACT, 
     CONTACT_ERROR,  CLEAR_CONTACTS,
     SET_CURRENT, CLEAR_CURRENT,
     FILTER_CONTACTS, CLEAR_FILTER,  CLEAR_ERROR
} from "../types";

const ContactState = props => {
     const INITIAL_STATE = {
          contacts: null,
          current: null,
          filtered: null,
          error: null
     };

     const [state, dispatch ] = useReducer(contactReducer, INITIAL_STATE);

     // actions:

     // Get contacts:
     const getContacts = async () => {

          try {
               const res = await axios.get("/api/contacts");
               dispatch({
                    type: GET_CONTACTS,
                    payload: res.data
               });
          } catch (error) {
               dispatch({
                    type: CONTACT_ERROR,
                    payload: error.response.data.msg
               });
          }
     };
     // Clear Contacts list:
     const clearContact = () => {
          dispatch({
               type: CLEAR_CONTACTS
          });
     };

     // Add contact:
     const addContact = async contact => {
          
          const config = {
               headers: {
                    "Content-Type": "application/json"
               }
          }
          try {
               const res = await axios.post("/api/contacts", contact, config);
               dispatch({
                    type: ADD_CONTACT,
                    payload: res.data
               });
          } catch (error) {
               dispatch({
                    type: CONTACT_ERROR,
                    payload: error.response.data.msg
               });
          }
     };

     // Update Contact
      const updateContact = async contact => {
          const config = {
               headers: {
                    "Content-Type": "application/json"
               }
          };

          try {
               const res = await axios
                    .put(`/api/contacts/${contact._id}`, contact, config);

               dispatch({
                    type: UPDATE_CONTACT,
                    payload: res.data
               });
          } 
          catch (error) {
               dispatch({
                    CONTACT_ERROR,
                    payload: error.response.data.msg
               });
          }
     };

     // Delete Contact
     const deleteContact = async id => {

          try {
               await axios.delete(`/api/contacts/${id}`);

               dispatch({
                    type: DELETE_CONTACT,
                    payload: id
               });
          } catch (error) {
               dispatch({
                    type: CONTACT_ERROR,
                    payload: error.response.data.msg
               })
          }
        
     };
     // Set Current contact
     const setCurrent = contact => {
          dispatch({
               type: SET_CURRENT,
               payload: contact
          });
     };

     // Clear Current contact
     const clearCurrent = () => {
         dispatch({
              type: CLEAR_CURRENT
         });
     };
    
     //Filter contacts
     const filterContacts = filteredText => {
          dispatch({
               type: FILTER_CONTACTS,
               payload: filteredText
          });
     };

     //Clear filter
     const clearFilter = () => {
          dispatch({
               type: CLEAR_FILTER
          });
     };
     // Clear Error:
     const clearError = () => {
          dispatch({
               type: CLEAR_ERROR
          });
     }
     return(
          <ContactContext.Provider
          value={{
               contacts: state.contacts,
               current: state.current,
               filtered: state.filtered,
               error: state.error,
               getContacts,
               addContact,
               deleteContact,
               clearContact,
               setCurrent,
               clearCurrent,
               updateContact,
               filterContacts,
               clearFilter,
               clearError
          }} 
          >
               {props.children}
          </ContactContext.Provider>
     )
}

export default ContactState;