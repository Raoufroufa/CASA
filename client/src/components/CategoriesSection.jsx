import React from "react";
import location from "../images/location.png";
import colocation from "../images/colocation1.png";
import { NavLink } from "react-router-dom";

const Categories = () => {
  return (
    <section
      className="mt-16 mx-auto px-4 max-w-screen-xl md:px-8"
      id="categories"
    >
      <div className="relative max-w-2xl mx-auto sm:text-center ">
        <div className="text-center mt-28 relative z-10 ">
          <h1 className="text-gray-500 text-3xl font-extrabold sm:text-4xl">
            Categories
          </h1>
          <p className="mt-3 text-gray-500">
            Explore Your Ideal Living Options with{" "}
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-primary">
              LA CASA
            </span>
            , updated every hour.
          </p>
          <p className="mt-3 text-gray-500">
            Discover the perfect living arrangement for your needs with LA
            CASA's diverse categories. Whether you're looking for a shared space
            or an entire property, our app offers two distinct categories to
            cater to your specific requirements.
          </p>
          <p className="mt-3 text-gray-500">
            Choose between Flatsharing and Renting to embark on your housing
            journey with confidence and ease.
          </p>
        </div>
        <div
          className="absolute inset-0 max-w-xs mx-auto h-44 blur-[118px]"
          style={{
            background:
              "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
          }}
        ></div>
      </div>

      <div className="mt-12 grid gap-10 sm:grid-cols-1 lg:grid-cols-2">
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <NavLink to="/renting-properties">
            <img className="rounded-t-lg w-full" src={location} alt="" />
          </NavLink>
          <div className="p-5">
            <NavLink to="/renting-properties">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-600 dark:text-white">
                Renting
              </h5>
            </NavLink>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Discover Your Dream Home.
            </p>
            <NavLink
              to="/renting-properties"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-primaryH focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Discover
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </NavLink>
          </div>
        </div>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <NavLink to="/flatsharing-properties">
            <img className="rounded-t-lg w-full" src={colocation} alt="" />
          </NavLink>
          <div className="p-5">
            <NavLink to="/flatsharing-properties">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-600 dark:text-white">
                Flatsharing
              </h5>
            </NavLink>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Find Your Perfect Roommate.
            </p>
            <NavLink
              to="/flatsharing-properties"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg  hover:bg-primaryH  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Find
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
