import React from "react";
import "./header.css";
import { NavLink, Link } from "react-router-dom";
function Header() {
  const openMenu = () => {
    document.querySelector("#mobile-menu").classList.toggle("hidden");
  };

  const profileHandler = () => {
    console.log("profileHandler");
  };

  return (
    <>
      <nav className="bg-gray-800 pr-6 pl-4 ">
        <div className="relative  flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 right-[45%] flex items-center lg:hidden">
            <Link
              to="/"
              className=" text-white  text-lg font-serif font-bold  "
              aria-current="page"
            >
              Legal Science
            </Link>
          </div>
          <div className="profileBtn absolute inset-y-0 right-[0%] lg:hidden flex items-center space-x-3 translate-x-2 ">
           <Link to={"/login"}> <svg
              className="cursor-pointer lucide lucide-circle-user-round"
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              color="white"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={profileHandler}
            >
              <path d="M18 20a6 6 0 0 0-12 0" />
              <circle cx="12" cy="10" r="4" />
              <circle cx="12" cy="12" r="10" />
            </svg></Link>
          </div>
          <div className="menuBtn absolute flex items-center lg:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={openMenu}
            >
              

              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

             
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center lg:items-stretch ">
            <div className="hidden  lg:flex items-center w-full  ">
              <div className="flex items-center justify-between  w-full ">
                <div className="logo flex">
                  <NavLink
                    to="/"
                    className=" text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-4 py-3 text-lg "
                    aria-current="page"
                  >
                    Legal Science
                  </NavLink>
                </div>
                <div className="options flex space-x-2">
                  <NavLink
                    to="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg "
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="journals"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-lg "
                  >
                    Journals
                  </NavLink>
                  <NavLink
                    to="about"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg "
                  >
                    About Us
                  </NavLink>
                  <NavLink
                    to="editorial"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg "
                  >
                    Editorial Board
                  </NavLink>
                  <NavLink
                    to="author"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg "
                  >
                    Author Guideliness
                  </NavLink>
                  <NavLink
                    to="archive"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg "
                  >
                    Archive
                  </NavLink>
                  <NavLink
                    to="contact"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg "
                  >
                    Contact Us
                  </NavLink>
                  <div className="flex items-center space-x-2">
                  <Link to={"/login"}> <svg
              className="cursor-pointer lucide lucide-circle-user-round"
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              color="white"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={profileHandler}
            >
              <path d="M18 20a6 6 0 0 0-12 0" />
              <circle cx="12" cy="10" r="4" />
              <circle cx="12" cy="12" r="10" />
            </svg></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden hidden transition-all duration-700" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <NavLink
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base "
            >
              Home
            </NavLink>
            <NavLink
              to="journals"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base "
            >
              Journals
            </NavLink>
            <NavLink
              to="about"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base "
            >
              About Us
            </NavLink>
            <NavLink
              to="editorial"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base "
            >
              Editorial Board
            </NavLink>
            <NavLink
              to="author"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base "
            >
              Author Guideliness
            </NavLink>
            <NavLink
              to="archive"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base "
            >
              Archive
            </NavLink>
            <NavLink
              to="contact"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base "
            >
              Contact Us
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
