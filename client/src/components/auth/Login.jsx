import React, { useState, useContext, useEffect } from 'react';
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";


const Login = (props) => {

     const authContext = useContext(AuthContext);
     const { login, error, clearErrors, isAuthenticated } = authContext;
     const alertContext = useContext(AlertContext);
     const { setAlert } = alertContext;
     
     useEffect(() => {
          if(isAuthenticated){
               props.history.push("/");
          }    
          if(error === "User does not exist!"){
               setAlert(error, "danger"); 
               clearErrors();
          }
          if(error === "Invalid username or password!"){
               setAlert(error, "danger");
               clearErrors();
          }
          // eslint-disable-next-line
     },[isAuthenticated, props.history]);

     const [user, setuser] = useState({
          email: "",
          password: ""
     });

     const { email, password} = user;

     const onChangeHandler = event => {
          const { name, value } = event.target;
          setuser({
               ...user,
               [name]: value
          });
     };
     const onSubmitHandler = event => {
          event.preventDefault();

               login({
                    email: email,
                    password: password
               });
               setuser({
                    email: "",
                    password: ""
               })
          };
          
     return (

         <form className="form-container" onSubmit={onSubmitHandler}>
              <h1 className="text-primary">Sign In</h1>

              <div className="form-group">
                   <label htmlFor="email">Email</label>
                   <input type="email" name="email" value={email}
                         autoComplete="password" required autoFocus
                         onChange={onChangeHandler} 
                   />
              </div>
              <div className="form-group">
                   <label htmlFor="password">Password</label>
                   <input type="password" name="password" value={password}
                         autoComplete="password" required
                         onChange={onChangeHandler} 
                   />
              </div>
              <input type="submit" value="Sign In"
              className="btn btn-primary btn-block"
              />

         </form>
     )
}

export default Login;
