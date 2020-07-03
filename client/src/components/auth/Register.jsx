import React, { useState, useContext } from 'react';
import AlertContext from "../../context/alert/alertContext";


const Register = () => {

     const alertContext = useContext(AlertContext);
     const { setAlert } = alertContext;
     const [user, setUser] = useState({
          name: "",
          email: "",
          password: "",
          password2: ""
     });

     const { name, email, password, password2 } = user;

     const onChangeHandler = (event) => {
          const { name, value } = event.target;
          setUser({
               ...user,
               [name]: value
          });
     };
     const onsubmitHandler = (event) => {
          event.preventDefault();

          if(name === "") {
               setAlert("Please enter a valid Name.", "danger");
          }
          else if(email === ""){
               setAlert("Please enter a valid email address.", "danger")
          }
          else if(password === ""){
               setAlert("Password must not be empty!","danger")
          }
          else if( password2 !== password) {
               setAlert("Password and Confirm Password must match.", "danger");
          }
          else{
               console.log("Register Submit");
          }
     };
     
     return (
          <div className="form-container">
               <h1>
                    Account <span className="text-primary">Register</span>
               </h1>
               <form onSubmit={onsubmitHandler}>
                    <div className="form-group">
                         <label htmlFor="name">Name</label>
                         <input type="text" name="name" value={name}
                              placeholder="John Smith" autoComplete="name"
                              onChange={onChangeHandler} required
                         />
                    </div>

                    <div className="form-group">
                         <label htmlFor="email" name="email">Email</label>
                         <input type="email" name="email" value={email}
                              placeholder="example@email.com" autoComplete="email"
                              onChange={onChangeHandler} required
                         />
                    </div>

                     
                    <div className="form-group">
                         <label htmlFor="password" name="password">Password</label>
                         <input 
                              type="password" name="password" value={password}
                              placeholder="Enter password" autoComplete="password"
                              minLength="6" maxLength="12" required 
                              onChange={onChangeHandler}
                         />
                    </div>

                    
                    <div className="form-group">
                         <label htmlFor="password2" name="password2">Confirm Password</label>
                         <input type="password" name="password2" value={password2}
                         placeholder="Confirm your password" autoComplete="password2"
                              onChange={onChangeHandler}
                         />
                    </div>

                    <input type="submit" value="Register"
                         className="btn btn-primary btn-block"
                    />

               </form>
          </div>
     )
}

export default Register;
