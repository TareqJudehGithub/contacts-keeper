import React, { useReducer } from "react";
import {v4 as uuidv4} from "uuid";

import ContactContext from "./contactContext";
import contactReducer from "./contextReducer";
import {
     ADD_CONTACT, 
     DELETE_CONTACT,
     SET_CURRENT,
     CLEAR_CURRENT,
     UPDATE_CONTACT,
     FILTER_CONTACTS,
     CLEAR_FILTER
} from "../types";

const ContactState = props => {
     const INITIAL_STATE = {
          contacts: [
               {
                    id: 1,
                    name: "Jill Johnson",
                    email: "jil@gmail.com",
                    phone: "111-111-1111",
                    type: "personal"
               },
               {
                    id: 2,
                    name: "Sarah Watson",
                    email: "sarah@gmail.com",
                    phone: "222-222-2222",
                    type: "personal"
               },
               {
                    id: 3,
                    name: "Harry White" ,
                    email: "harry@gmail.com",
                    phone: "333-333-3333",
                    type: "professional"
               },
          ]
     }

     const [state, dispatch ] = useReducer(contactReducer, INITIAL_STATE);

     // actions:

     // Add contact:
     const addContact = contact => {
          contact.id = uuidv4();  // generates a random ID for the frontend.
          dispatch({ 
               type: ADD_CONTACT,
               payload: contact
          });
     };

     // Delete Contact
     const deleteContact = id => {
         dispatch({
              type: DELETE_CONTACT,
              payload: id
         })
     }
     // Set Current contact
     
     // Clear Current contact

     // Update Contact

     //Filter contacts

     //Clear filter

     return(
          <ContactContext.Provider
          value={{
               contacts: state.contacts,
               addContact,
               deleteContact
          }} 
          >
               {props.children}
          </ContactContext.Provider>
     )
}

export default ContactState;