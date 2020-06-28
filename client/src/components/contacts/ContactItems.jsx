import React ,{ useContext } from 'react';
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";


const ContactItems = ({ contactItems }) => {
     
     const contactContext = useContext(ContactContext);
     const { deleteContact } = contactContext;
     const { id, name, email, phone, type } = contactItems;
     
     const deleteContactHandler = () => {
          deleteContact(id);
     }
     return (
          <div className="card bg-light">
               <h3 className="text-primary text-left">
                    {name}{" "}
                    <span style={{ float: "right"}}
                    className={"badge " + (type === "professional"
                                                  ? 
                                                  "badge-success"
                                                  :
                                                  "badge-primary"          
                                        )}
                    >
                    {/* Make type first letter an uppercase: */}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
               </h3>
               <ul className="list">
                    {
                    email && 
                    (<li>
                         <i className="fas fa-envelope-open">{email}</i>
                    </li>)
                    }
                    {
                         phone && 
                         (<li className="fas fa-phone">{phone}</li>)
                    }
               </ul>
               <p>
                    <button className="btn btn-primary btn-sm">Edit</button>

                    <button className="btn btn-danger btn-sm"
                    onClick={deleteContactHandler}
                    >
                         Delete
                    </button>
               </p>
          </div>
     )
}
ContactItems.prototype = {
     contactItems: PropTypes.object.isRequired
}
export default ContactItems;
