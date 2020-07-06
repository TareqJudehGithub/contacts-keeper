import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import AlertAuth from '../../context/alert/alertContext';


const ContactForm = () => {

     const contactContext = useContext(ContactContext);
     const { 
          addContact, updateContact, current, clearCurrent,
           clearFilter, contacts, error, clearError
     } = contactContext;
     const [contact, setContact] = useState({
          name: "",
          email: "",
          phone: "",
          type: "personal"
     });
     const { name, email, phone, type } = contact;
     const alertContext = useContext(AlertAuth);
     const { setAlert } = alertContext;


     useEffect(() => {
          if(error === "Error! Contact already exists!"){
               setAlert(error, "danger");
               clearError();
               
          }
          if(current !== null) {
               setContact(current);
          }
          else{
               setContact({
                    name: "",
                    email: "",
                    phone: "",
                    type: "personal"
               });
          }
           // eslint-disable-next-line
     }, [contactContext, current]);


     const onChangeHandler = (event) => {
          const { name, value } = event.target;
          setContact({ 
               ...contact,
               [name]: value 
          });
     };
     
     const clearAll = () => {
          clearCurrent();
     };

     const onSubmitHandler = (event) => {
          event.preventDefault();

          if(contacts.email === true){
               setAlert(error, "danger")
          }
          if(current === null){
               addContact(contact);
          }
          else{
               updateContact(contact);
               clearFilter();
          }
          clearAll();
     };
    
     return (
          
          <form onSubmit={onSubmitHandler}>
               <h2 className="text-primary">
                    {
                         current
                         ?
                         "Edit Contact"
                         :
                         "Add Contact"
                    }
               </h2>

               <input 
                    type="text" placeholder="John Smith" name="name" value={name}
                    onChange={onChangeHandler}
                    required
               />

               <input 
                    type="email" placeholder="Example@email.com" name="email"
               value={email} 
               onChange={onChangeHandler}
               required
               />

               <input type="text" placeholder="555-555- 5555" name="phone" value={phone}
               onChange={onChangeHandler}
               />

               <h4>Contact Type</h4>

               <input 
                    type="radio" name="type" value="personal"
                    checked={type === "personal"}
                    onChange={onChangeHandler} 
               />{" "}
                    Personal{" "}

               <input 
               type="radio" name="type" value="professional"
               checked={type=== "professional"}
               onChange={onChangeHandler} 
               />{" "}
                   Professional
               <div>
                    <input 
                    type="submit"
                    value={
                         current ? "Update Contact" :"Add Contact" 
                    }
                    className="btn btn-primary btn-block"
                    />
               </div>
               {
                    current 
                    &&
                    <div>
                         <button 
                         className="btn btn-light btn-block"
                         onClick={clearAll}
                         >
                              Clear
                         </button>
                    </div>
               }
          </form>
     )
}

export default ContactForm;
