import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../../components/Image.jsx";
import moment from "moment";
import communes from "../../data/communes.json";
import wilayas from "../../data/wilayas.json";

const ActiveProperties = () => {
  const [properties, setProperties] = useState([]);

  const [isPriceSelected, setIsPriceSelected] = useState(false);

  const [filter, setFilter] = useState({
    category: "",
    price: "",
    wilaya: "",
    commune: "",
    contractType: "",
  });

  useEffect(() => {
    console.log(filter.price);
    axios
      .get(
        `/properties/home?category=${filter.category}&${
          isPriceSelected ? "customPrice" : "price"
        }=${filter.price}&wilaya=${filter.wilaya}&commune=${filter.commune}&
contractType=${filter.contractType}`
      )
      .then((response) => {
        setProperties(response.data);
        console.log(response.data);
      });
  }, [filter, isPriceSelected]);

  return (
    <div className="mt-10 grid gap-x-14 gap-y-24 ">
      <div className="text-center">
        <h1 className="text-3xl text-gray-700 font-semibold">
          Discover Your Perfect Home with{" "}
          <span className=" text-primary">LA CASA</span>
        </h1>
        <p className="mt-6 text-gray-500">
          Welcome to LA CASA, your ultimate destination for finding your perfect
          home.{" "}
        </p>
      </div>
      <div className="flex gap-2">
        <select
          value={filter.category}
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              category: e.target.value,
            }));
          }}
        >
          <option value="" disabled>
            select a category
          </option>
          <option value="Flatsharing">flatsharing</option>
          <option value="Renting">renting</option>
        </select>

        <select
          value={isPriceSelected ? "custom" : filter.price}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "custom") {
              setIsPriceSelected(true);
            } else {
              setFilter((prev) => ({
                ...prev,
                price: value,
              }));
              setIsPriceSelected(false);
            }
          }}
        >
          <option value="" disabled>
            select a price
          </option>
          <option value="custom">Custom</option>
          <option value="50000">$50000 or less</option>
          <option value="20000">$20000 or less</option>
          {/* Add more options as needed */}
        </select>
        {isPriceSelected && (
          <input
            type="text"
            value={filter.price}
            onChange={(e) => {
              setFilter((prev) => ({
                ...prev,
                price: e.target.value,
              }));
            }}
            placeholder="Enter a custom price"
          />
        )}

        <select
          value={filter.wilaya}
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              wilaya: e.target.value,
            }));
          }}
        >
          <option value="" disabled>
            select a wilaya
          </option>
          {wilayas.map((wilaya, i) => {
            return (
              <option value={wilaya.title} key={i}>
                {" "}
                {wilaya.title}
              </option>
            );
          })}
        </select>

        <select
          value={filter.commune}
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              commune: e.target.value,
            }));
          }}
        >
          <option value="" disabled>
            select a commune
          </option>
          {communes.map((commune, i) => {
            return commune["wilaya_id"] === filter.wilaya ? (
              <option value={commune.title} key={i}>
                {commune.title}
              </option>
            ) : null;
          })}
        </select>

        <select
          value={filter.contractType}
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,

              contractType: e.target.value,
            }));
          }}
        >
          <option value="" disabled>
            select a contrat
          </option>
          <option value="Annuel">Annuel</option>
          <option value="Mensuel">Mensuel</option>
        </select>
      </div>

      <div className=" grid gap-x-14 gap-y-24 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 ">
        {properties?.length > 0 &&
          properties.map((property, index) => (
            <Link
              key={index}
              to={"/property/" + property._id}
              className="block rounded-lg p-4 shadow-sm shadow-primary"
            >
              {property.photos?.[0] && (
                <Image
                  className="h-56 w-full rounded-md object-cover"
                  src={property.photos?.[0]}
                  alt="Home"
                />
              )}

              <div className="mt-2">
                <dl>
                  <div>
                    <dt className="sr-only">Price</dt>

                    <dd className="text-sm text-gray-500">
                      {property.price} DA
                    </dd>
                  </div>

                  <div>
                    <dt className="sr-only">Address</dt>

                    <dd className="font-medium">{property.location}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Title</dt>

                    <dd className="text-sm text-gray-600">{property.title}</dd>
                  </div>
                </dl>

                <div className="mt-6 flex items-center gap-8 text-xs">
                  <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                    <svg
                      className="h-4 w-4 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                      />
                    </svg>

                    <div className="mt-1.5 sm:mt-0">
                      <p className="text-gray-500">Category</p>

                      <p className="font-medium">{property.category}</p>
                    </div>
                  </div>

                  <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                    <svg
                      className="h-4 w-4 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>

                    <div className="mt-1.5 sm:mt-0">
                      <p className="text-gray-500">Contarct Type</p>

                      <p className="font-medium">{property.contractType}</p>
                    </div>
                  </div>

                  <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                    <svg
                      className="h-4 w-4 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>

                    <div className="mt-1.5 sm:mt-0">
                      <p className="text-gray-500">Time</p>

                      <p className="font-medium">
                        {moment(property.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ActiveProperties;
