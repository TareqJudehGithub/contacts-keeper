import React, { useState } from 'react';


const Login = () => {

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
          console.log("User Sign in");
     }

     return (

         <form className="form-container" onSubmit={onSubmitHandler}>
              <h1 className="text-primary">Sign In</h1>

              <div className="form-group">
                   <label htmlFor="email">Email</label>
                   <input type="email" name="email" value={email}
                         onChange={onChangeHandler}
                   />
              </div>
              <div className="form-group">
                   <label htmlFor="password">Password</label>
                   <input type="password" name="password" value={password}
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
