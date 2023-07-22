import React from 'react'
import { Link } from "react-router-dom";
import Illustration from "../images/Apartment rent-pana.png";

const HeroSection = () => {
  return (
    <section
      className="mt-6 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8"
      id="home"
    >
      <div className="space-y-4 flex-1 sm:text-center lg:text-left ">
        <h1 className="text-gray-500 font-bold text-4xl xl:text-5xl">
          Trouvez votre maison ou votre colocation idéale <br />
          <span className="text-primary "> LA CASA</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
          Votre destination ultime pour des expériences de colocation et de
          location de maison fluides. <br />
          Débloquez un monde de découvertes ! Explorez les diverses maisons et
          les publications captivantes partagées par d'autres utilisateurs sur
          notre application.
        </p>
        <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
          <Link
            to="/properties"
            className=" border-2 border-gray-500 px-7 py-3 w-full bg-white font-bold text-gray-500 text-xl text-center rounded-md shadow-2x,l block sm:w-auto hover:bg-primaryH hover:text-white hover:border-primaryH"
          >
            Maisons
          </Link>
          <Link
            to="/posts"
            className="px-7 py-3 w-full bg-primaryH font-bold text-white text-xl text-center rounded-md block sm:w-auto hover:bg-white hover:text-gray-500 hover:border-2 hover:border-gray-500"
          >
            Publications
          </Link>
        </div>
      </div>
      <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3 shadow-2xl">
        <img
          src={Illustration}
          className="w-full mx-auto sm:w-10/12  lg:w-full  "
          alt="Illustration"
        />
      </div>
    </section>
  );
}

export default HeroSection