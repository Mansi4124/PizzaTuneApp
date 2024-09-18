import React from 'react'
import "./Footer.css";
export default function Footer() {
  return (
    <>
      <footer class="row" id="f">
        <div class="col-lg-3">
            <h6> USEFUL LINKS</h6>
            <a href="/"> <i class="fa-solid fa-angle-right fa-sm"></i>HOME</a><br/>
            <a href="/about"> <i class="fa-solid fa-angle-right fa-sm"></i>ABOUT US</a><br/>
            <a href="/menu"> <i class="fa-solid fa-angle-right fa-sm"></i>MENU</a><br/>
            <a href="/cutomerInquiry"> <i class="fa-solid fa-angle-right fa-sm"></i>CUSTOMER ENQUIRY</a><br/>
            <a href="/frenchiseInquiry"> <i class="fa-solid fa-angle-right fa-sm"></i>FRANCHISE ENQUIRY</a><br/>
            
           
        </div>
        <div class="col-lg-3">
            <h6> Contact </h6>
            <p> <i class="fa-solid fa-location-dot fa-sm"></i>Ahmedabad</p>
            <p> <i class="fa-solid fa-phone fa-sm"></i> 9313501512</p>
            <p>
            <a href="#"><i class="fa-brands fa-twitter"></i></a>
                <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="#"><i class="fa-brands fa-youtube"></i></a>
            </p>
              
               
        </div>
        <div class="col-lg-3">
            <h6>TIMINGS </h6>
            <p><em> MORNING </em> 11AM TO 3PM</p>
            <p><em>EVENING </em> 6PM TO 1AM </p>
        </div>
        <div class="col-lg-3">
            <h6> Join Us</h6>
            <p>Will provide you updates on new menu items, promotions, and events. </p>
            <div class="input-group mb-3">
                <input type="email" class="form-control" placeholder="ENTER YOUR EMAIL"/>
                <input type="submit" value="SUBMIT"/>
            </div>
        </div>
    </footer>
    </>
    

  )
}
