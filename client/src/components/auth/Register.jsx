import React, { useState } from 'react'

const Register = () => {

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
          console.log("Register Submit");
     }
     
     return (
          <div className="form-container">
               <h1>
                    Account <span className="text-primary">Register</span>
               </h1>
               <form onSubmit={onsubmitHandler}>
                    <div className="form-group">
                         <label htmlFor="name">Name</label>
                         <input type="text" name="name" value={name}
                              onChange={onChangeHandler}
                         />
                    </div>

                    <div className="form-group">
                         <label htmlFor="email" name="email">Email</label>
                         <input type="email" name="email" value={email}
                              onChange={onChangeHandler}
                         />
                    </div>

                     
                    <div className="form-group">
                         <label htmlFor="password" name="password">Password</label>
                         <input type="password" name="password" value={password}
                              onChange={onChangeHandler}
                         />
                    </div>

                    
                    <div className="form-group">
                         <label htmlFor="password2" name="password2">Password</label>
                         <input type="password" name="password2" value={password2}
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
