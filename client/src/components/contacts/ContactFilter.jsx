import React, { useContext, useRef, useEffect } from 'react';
import ContactContex from "../../context/contact/contactContext";


const ContactFilter = () => {

     const contactContex = useContext(ContactContex);
     const { filtered, filterContacts, clearFilter } = contactContex;
     const filteredText = useRef("");


     useEffect(() => {
          if(filtered === null) {
               filteredText.current.value = "";
          }
     });
     const onChangeHandler = event => {       
          // if the filter value is not empty, then run it:
          if(filteredText.current.value !== ""){
               // event.target.value is the actual text
               filterContacts(event.target.value);
          }
          else{
               clearFilter();
          }
     }

     return (
          <form>
               <input 
               ref={filteredText}
               type="text"
               placeholder="Search contacts.."
               onChange={onChangeHandler}
               />
          </form>
     )
}

export default ContactFilter;
