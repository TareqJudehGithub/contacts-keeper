import React, { useContext } from 'react';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import ContactItems from "./ContactItems";

const Contacts = () => {
     const contactContext = useContext(ContactContext);
     const { contacts, filtered } = contactContext;

     if(contacts.length === 0){
          return <h4 style={{textAlign: "center"}}>Your Contacts List is empty!</h4>
     }

     return (
          <React.Fragment>
               <TransitionGroup>
               {
                    filtered
                    ?
                    filtered.map(contact =>
                         (
                         <CSSTransition  
                              key={contact.id}
                              timeout={500}
                              classNames="item"
                              >
                               <ContactItems contact={contact}/>
                         </CSSTransition>    
                         )
                    )    
                    :
                    contacts.map(contact => 
                         (
                         <CSSTransition  
                         key={contact.id}
                         timeout={500}
                         classNames="item"
                         >
                              <ContactItems contact={contact}/>
                         </CSSTransition> 
                         )
                    )    
               }
               </TransitionGroup>
              
          </React.Fragment>
     )
}

export default Contacts;
