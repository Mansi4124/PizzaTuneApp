
import "./App.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import About from "./components/About/About";
import FranchiseEnquiry from "./components/FranchiseEnquiry/FranchiseEnquiry";
import ContactUs from "./components/ContactUs/ContactUs";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import CustomerInquiry from "./components/ContactUs/ContactUs";
import Menu from "./components/Menu/Menu";
import LoginForm from "./components/Login/login";
import SignUpForm from "./components/SignUp/Signup";
import AddMenu from "./components/AddMenu/AddMenu";
import AdminMenu from "./components/AdminMenu/Adminmenu";
import Order from "./components/Order/Order";
import CreateUser from "./components/CreateUser/CreateUser";
import AdminContact from "./components/AdminContact/AdminContact";
import AdminMenuWithAddAndUpdate from "./components/AdminMenuWithAdd&Update.js/AdminMenuWithAdd&Update";
import AdminHome from "./components/AdminHome/AdminHome";
import AboutDiv from "./components/AboutDiv/AboutDiv";




function App() {
 
  function getCookie(name) {
    const cookieArr = document.cookie.split(";"); // Split cookies by semicolons

    for (let i = 0; i < cookieArr.length; i++) {
      let cookie = cookieArr[i].trim(); // Remove whitespace at the beginning

      // Check if the cookie starts with the desired name
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1); // Return cookie value
      }
    }

    return null; // Return null if not found
  }

  const userId = getCookie("userId");
  const role = getCookie("role");
  console.log("userId", userId, "role", role);


  return (
    <div className="App">
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/cutomerInquiry" element={<CustomerInquiry />} />
          <Route path="/frenchiseInquiry" element={<FranchiseEnquiry />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/add-menu" element={<AddMenu />} />
          <Route path="/order" element={<Order />} />
          <Route path="/about-div" element={<AboutDiv />} />
          {role === "admin" && (
            <>
              <Route path="/admin-menu" element={<AdminMenu />} />
              {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
              <Route path="/createuser" element={<CreateUser />} />
              <Route path="/admincontact" element={<AdminContact />} />
              <Route
                path="/admin-menu-add-update"
                element={<AdminMenuWithAddAndUpdate />}
              />
              <Route path="/admin-home" element={<AdminHome />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
