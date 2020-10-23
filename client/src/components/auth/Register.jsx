import React, { useState, useContext, useEffect } from 'react';
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import Alert from '../layout/Alert';
const Register = (props) => {
     
     const authContext = useContext(AuthContext);
     const { register, error, clearError, isAuthenticated } = authContext;
     const alertContext = useContext(AlertContext);
     const { setAlert } = alertContext;
     const [user, setUser] = useState({
          name: "",
          email: "",
          password: "",
          password2: ""
     });

     const { name, email, password, password2 } = user;

     useEffect(() => {
          if(isAuthenticated){
               props.history.push("/");
          }
          if(error){
               setAlert(error, "danger");
               clearError();
          }
          // eslint-disable-next-line
     }, [error, isAuthenticated, props.history]);  // only run error when state changes.

     const onChangeHandler = (event) => {
          const { name, value } = event.target;
          setUser({
               ...user,
               [name]: value
          });
     };

     const onsubmitHandler = (event) => {
          event.preventDefault();

          if(password2 !== password) {
               setAlert("Password and Confirm Password must match.", "danger");
          }
          else{
               register({
                    name: name,
                    email: email,
                    password: password
               });
               console.log("Register Submit");
               setUser({
                    name: "",
                    email: "",
                    password: "",
                    password2: ""
               });
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
                              autoFocus 
                              onChange={onChangeHandler}  
                         />
                    </div>

                    <div className="form-group">
                         <label htmlFor="email" name="email">Email Address</label>
                         <input type="email" name="email" value={email}
                              placeholder="example@email.com" autoComplete="email"
                              onChange={onChangeHandler} 
                         />
                    </div>

                    <div className="form-group">
                         <label htmlFor="password" name="password">Password</label>
                         <input 
                              type="password" name="password" value={password}
                              placeholder="Must have at least 6 characters" 
                              autoComplete="password"
                              minLength="6" maxLength="12"  
                              onChange={onChangeHandler}
                         />
                    </div>

                    <div className="form-group">
                         <label htmlFor="password2" name="password2">Confirm Password</label>
                         <input type="password" name="password2" value={password2}
                         autoComplete="password2"
                              onChange={onChangeHandler}
                         />
                    </div>

                    <input type="submit" value="Register"
                         className="btn btn-primary btn-block"
                    />

               </form>
               <Alert />
          </div>
     )
};

export default Register;
