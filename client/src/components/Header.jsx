import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Logo from "../images/Logo.png";
import { HashLink as NavLink } from "react-router-hash-link";
import { UserContext } from "../context/UserContext.jsx";

function Header() {
  const { decodedToken } = useContext(UserContext);
  

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="mb-24">
      <nav className="bg-white  dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-300 dark:border-gray-600 shadow-xl">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink to="/" className="flex  items-center">
            <img src={Logo} className="h-8 md:h-14 mr-3" alt="LA CASA Logo" />
            <span className="self-center text-md md:text-2xl font-semibold whitespace-nowrap text-gray-600">
              LA CASA
            </span>
          </NavLink>

          <div className="flex md:order-2 ">
            { !!decodedToken ? (
              <Link
                to="/account"
                className="flex items-center border border-gray-300 rounded-full p-2  mt-2 mr-2"
              >
                <div className="w-6 h-6 md:w-10 md:h-10 bg-primary text-white flex items-center justify-center rounded-full">
                  {decodedToken.name.charAt(0)}
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-white text-base md:text-lg  bg-primary hover:bg-primaryH focus:ring-4 focus:outline-none focus:ring-primaryR font-medium rounded-lg  px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Log in
              </Link>
            )}

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={handleMenuToggle}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/#home"
                  className="block py-2 pl-3 pr-4 text-gray-600 text-xl   rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  {" "}
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/#categories"
                  className="block py-2 pl-3 pr-4 text-gray-600 text-xl   rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/#about"
                  className="block py-2 pl-3 pr-4 text-gray-600 text-xl rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/#contact"
                  className="block py-2 pl-3 pr-4 text-gray-600 text-xl rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
