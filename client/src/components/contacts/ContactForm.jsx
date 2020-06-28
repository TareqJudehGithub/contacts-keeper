import React, { useState, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';


const ContactForm = () => {

     const contactContext = useContext(ContactContext);
     const { contacts } = contactContext;
     const [contact, setContact] = useState({
          name: "",
          email: "",
          phone: "",
          type: "personal"
     });

     const { name, email, phone, type } = contact;

     const onChangeHandler = (event) => {
          const { name, value } = event.target;
          setContact({ 
               ...contact,
               [name]: value 
          });
     };
     const onSubmitHandler = (event) => {
          
          event.preventDefault();
          contactContext.addContact(contact);
          setContact({
               name: "",
               email: "",
               phone: "",
               type: "personal"
          });
     };

     return (
          <form onSubmit={onSubmitHandler}>
               <h2>Add contact</h2>

               <input 
               type="text"
               placeholder="John Smith"
               name="name"
               value={name}
               onChange={onChangeHandler}
               required
               />

               <input 
               type="email"
               placeholder="Example@email.com"
               name="email"
               value={email}
               onChange={onChangeHandler}
               />

               <input 
               type="text"
               placeholder="555-555- 5555"
               name="phone"
               value={phone}
               onChange={onChangeHandler}
               />

               <h5>Contact Type</h5>

               <input 
               type="radio"
               name="type"
               value="personal"
               checked={type === "personal"}
               onChange={onChangeHandler} 
               />{" "}
                    Personal{" "}

               <input 
               type="radio"
               name="type"
               value="professional"
               checked={type=== "professional"}
               onChange={onChangeHandler} 
               />{" "}
                   Professional
               <div>
                    <input 
                    type="submit"
                    value="Add Contact"
                    className="btn btn-primary btn-block"
                    />
               </div>
          </form>
     )
}

export default ContactForm;
