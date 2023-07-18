import React from 'react'
import { Link } from "react-router-dom";
import Logo from "../images/Logo.png";

const HeroSection = () => {
  return (
    <section
      className="mt-6 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8"
      id="home"
    >
      <div className="space-y-4 flex-1 sm:text-center lg:text-left ">
        <h1 className="text-gray-500 font-bold text-4xl xl:text-5xl">
          Find Your Perfect Home or Roommate
          <span className="text-primary"> LA CASA</span>
        </h1>
        <p className="text-gray-500 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
          your ultimate destination for seamless flatsharing and house renting
          experiences
        </p>
        <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
          <Link
            to="/properties"
            className="px-7 py-3 w-full bg-white text-gray-500 text-lg text-center rounded-md shadow-md block sm:w-auto hover:bg-primaryH hover:text-white"
          >
            Properties
          </Link>
          <Link
            to="/posts"
            className="px-7 py-3 w-full bg-primaryH text-white text-lg text-center rounded-md block sm:w-auto hover:bg-white hover:text-gray-500"
          >
            Posts
          </Link>
        </div>
      </div>
      <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3 ">
        <img
          src={Logo}
          className="w-full mx-auto sm:w-10/12  lg:w-full shadow-2xl "
          alt="LA CASA Logo"
        />
      </div>
    </section>
  );
}

export default HeroSection