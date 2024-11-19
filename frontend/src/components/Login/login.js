import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../Login/login.css";
import axios from "axios";

function LoginForm() {
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...user, [name]: value });
  };

  const navigate = useNavigate();
  
  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/signin/`, user);
      const data = res.data;

      if (data.success) {
        const userId = data.user_id;
        const role = data.role; // Get the role from the response

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);

                // Set userId cookie
        document.cookie = `userId=${userId}; expires=${expiryDate.toUTCString()}; path=/; secure; SameSite=Lax`;

        // Set role cookie
        document.cookie = `role=${role}; expires=${expiryDate.toUTCString()}; path=/; secure; SameSite=Lax`;


        setTimeout(() => {
          // Redirect based on user role
          if (role === "admin") {
            navigate('/admin-home'); // Admin dashboard route
          } else if (role === "customer") {
            navigate('/'); // Customer dashboard route
          } else {
            navigate('/'); // Default redirection if role is unknown
          }
        }, 3000); // 1000 ms = 1 second
      } else {
        setFormErrors(data);
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setFormErrors({ message: 'An error occurred. Please try again.' });
    }
  };

  return (
    <div className="sign-in">
      <div className="login">
        <form>
          <h1>Login</h1>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={changeHandler}
            value={user.email}
          />
          <p className="error">{formErrors.email}</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={user.password}
          />
          <p className="error">{formErrors.notMatch}</p>
          <button
            type="submit"
            className="button_common"
            onClick={loginHandler}
            value="Sign in"
          >Sign in</button>
        </form>
        <a href="/signup">Not yet registered? Sign up Now</a>
      </div>
    </div>
  );
}

export default LoginForm;
