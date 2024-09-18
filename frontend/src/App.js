import logo from "./logo.svg";
import "./App.css";

import Carousel from "./components/Carousel";
import Carousel1 from "./components/Carousel";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import DivFlex from "./components/Desc/DivFlex";
import RowCol from "./components/PhotoGallary/RowCol";

import About from "./components/About/About";
import FranchiseEnquiry from "./components/FranchiseEnquiry/FranchiseEnquiry";
import ContactUs from "./components/ContactUs/ContactUs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import CustomerInquiry from "./components/ContactUs/ContactUs";
import Menu from "./components/Menu/Menu";
import LoginForm from "./components/Login/login";
import SignUpForm from "./components/SignUp/Signup";
import AddMenu from "./components/AddMenu/AddMenu";
import MenuList from "./components/Menu-list/Menu-list";
import AdminMenu from "./components/AdminMenu/Adminmenu";
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import Order from "./components/Order/Order";
import CreateUser from "./components/CreateUser/CreateUser";
import AdminContact from "./components/AdminContact/AdminContact";
// import function to register Swiper custom elements


const img1 = "logo.png";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/cutomerInquiry" element={<CustomerInquiry />} />
          <Route path="/frenchiseInquiry" element={<FranchiseEnquiry />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/signup" element={<SignUpForm/>}/>
         
          <Route path="/add-menu" element={<AddMenu/>} />
          <Route path="/order" element={<Order/>} />
          <Route path="/admin-menu" element={<AdminMenu/>} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route path="/createuser" element={<CreateUser/>}/>
          <Route path="/admincontact" element={<AdminContact/>}/>
        </Routes>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
