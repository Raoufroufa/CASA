import React from "react";
import { Link } from "react-router-dom";
import AccountNav from "../../components/AccountNav.jsx";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import PropertyImg from "../../components/PropertyImg.jsx";
// import { FaTrash } from "react-icons/fa";
import { UserContext } from "../../context/UserContext.jsx";

function PropertiesPage() {
  const { decodedToken } = useContext(UserContext);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (decodedToken) {
      axios.get("/properties/yours").then(({ data }) => {
        setProperties(data);
       
      });
    }
  }, [decodedToken]);

  // const handleDeleteProperty = (propertyId) => {
  //   // Perform the deletion logic using the propertyId, send a DELETE request to the server
  //   axios
  //     .delete(`/properties/${propertyId}`)
  //     .then(() => {
  //       // If deletion is successful, update the properties state
  //       setProperties((prevProperties) =>
  //         prevProperties.filter((property) => property._id !== propertyId)
  //       );
  //     })
  //     .catch((error) => {
  //       // Handle error case
  //       console.error("Error deleting property:", error);
  //     });
  // };

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to="/account/properties/new"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add new property
        </Link>
      </div>
      <div className="mt-4">
        {properties.length > 0 &&
          properties.map((property) => (
            <article
              key={property._id}
              className="rounded-xl border-2 border-blue-100 bg-white mt-2"
            >
              <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
                <Link
                  to={"/property/" + property._id}
                  className="block shrink-0"
                >
                  <PropertyImg
                    property={property}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                </Link>
                <div>
                  <h3 className="font-medium sm:text-lg">
                    <Link
                      to={"/property/" + property._id}
                      className="hover:underline"
                    >
                      {property.title}
                    </Link>
                  </h3>

                  <p className="line-clamp-2 text-sm text-gray-700">
                    {property.description}
                  </p>

                  <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                    <Link
                      to={"/account/properties/" + property._id}
                      className="flex items-center gap-1 text-gray-500 hover:text-primary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M13 3l-7 7 3 3 7-7 3 3-7 7H6v-6l7-7z" />
                      </svg>

                      <p className="text-xs">Edit</p>
                    </Link>

                    <span className="hidden sm:block" aria-hidden="true">
                      &middot;
                    </span>

                    <p className="hidden sm:block sm:text-xs sm:text-gray-500">
                      Posted by{" "}
                      <Link
                        to="/account"
                        className="font-medium underline hover:text-gray-700"
                      >
                        {property.creator.name}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <strong
                  className={`-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl  px-3 py-1.5 text-white  ${
                    property.status ? "bg-green-600" : "bg-gray-600"
                  }`}
                >
                  {property.status ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="h-4 w-4"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M16 12l-4 4-4-4M12 8v8" />
                    </svg>
                  )}

                  <span className="text-[10px] font-medium sm:text-xs">
                    {property.status ? "Active" : "Inactive"}
                  </span>
                </strong>
              </div>
            </article>
          ))}
      </div>
    </div>
  );
}

export default PropertiesPage;
