import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../SignUp/Signup.css";
import axios from "axios";

function Sign_up() {
  const [formErrors, setFormErrors] = useState({});
  const [user, setUserDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
    role: "customer" // Set default role as 'customer'
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...user, [name]: value });
  };

  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/signup/`, user);
      const data = res.data;

      if (data.success) {
        const userId = data.user_id;
        const role = data.role;
        console.log("role",role);

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);

        document.cookie = `userId=${userId};role=${role} expires=${expiryDate.toUTCString()}; path=/; secure; SameSite=Lax`;
        document.cookie = `role=${role}; expires=${expiryDate.toUTCString()}; path=/; secure; SameSite=Lax`;
        // Redirect based on the role
        if (user.role === "admin") {
          navigate('/admin-home');
        } else if (user.role === "customer") {
          navigate('/');
        } else {
          navigate('/');
        }
      } else {
        setFormErrors(data);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setFormErrors({ message: 'An error occurred. Please try again.' });
    }
  };

  return (
    <div className="sign-up">
      <div className="register">
        <form>
          <h1>Create your account</h1>
          <input
            type="text"
            name="fname"
            id="fname"
            placeholder="First Name"
            onChange={changeHandler}
            value={user.fname}
          />
          <input
            type="text"
            name="lname"
            id="lname"
            placeholder="Last Name"
            onChange={changeHandler}
            value={user.lname}
          />
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
          <p className="error">{formErrors.password}</p>
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            placeholder="Confirm Password"
            onChange={changeHandler}
            value={user.cpassword}
          />
          <p className="error">{formErrors.cpassword}</p>
          {/* Remove the role selection dropdown */}
          <p className="error">{formErrors.role}</p>
          <button
            className="button_c"
            onClick={signupHandler}
            value="Sign up"
          >Sign up</button>
        </form>
        <p className="error">{formErrors.accountFound}</p>
        <a href="/login">Already registered? Sign in</a>
      </div>
    </div>
  );
}

export default Sign_up;
