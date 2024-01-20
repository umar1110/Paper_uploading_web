import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer " style={{ backgroundColor: "rgb(17, 24, 39)" }}>
      <div className=" footer-main py-8 border-gray-600 pb-4 border-b-2 w-[80%] md:justify-between mx-auto sm:space-y-0  space-y-6  sm:flex flex-wrap  ">



        <div className="about-us-footer">
          <h1>About Us</h1>
          <div className="info space-y-1">
            <p>A jounal of </p>

            <a href="https://uniquescientificpublishers.com/journals/">
              Unique Scientific Publishers
            </a>

            <p>Faisalabad,Pakistan</p>
          </div>
        </div>

        <div className="contact-info-footer">
          <h1>Contact Info</h1>
          <div className="info space-y-1">
            <p>Prof,Dr.Umar Farooq,Editor</p>
            <p>editor@agrobiologicalrecords.com</p>
            <p>Phone: +92 333 6517844</p>
          </div>
        </div>

        <div className="important-links-footer flex flex-col">
          <h1>Important Links</h1>
          <div className="info space-y-1">
            <Link to={"editorial"}>Editorial Board</Link>
            <Link to={"auathor"}>Author Guideliness</Link>
            <Link to={"archive"}>Archive</Link>
            <Link to={"contact"}>Contact Us</Link>
          </div>
        </div>

        <div className="visitors">
          <h1>Visitors</h1>
          <div className="info space-y-8">
            <p>0330330003</p>
            <button className="issue bg-blue-500 text-white py-1 px-2 rounded-md  text-xl">
              Issue Content Alert
            </button>
          </div>
        </div>
      </div>
      <div className="copyright text-center py-6">
        <p>Copyright ©20232023 All rights reserved | Agrobiological Records</p>
      </div>
    </div>
  );
}

export default Footer;
