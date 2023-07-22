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
    <section className="mt-36 mx-auto px-4 max-w-screen-xl md:px-8">
      <div className="text-center">
        <h1 className="text-3xl text-gray-700 font-semibold">
          Découvrez votre maison parfaite avec{" "}
          <span className=" text-primary">LA CASA</span>
        </h1>
        <p className="mt-6 text-gray-500 text-lg">
          Bienvenue à <strong className=" text-primary">LA CASA</strong>, votre
          destination ultime pour trouver votre maison idéale.{" "}
        </p>
      </div>

      {/* Filter section */}
      <div className="flex flex-col md:flex-row gap-2 mt-8">
        {/* Category */}
        <select
          value={filter.category}
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              category: e.target.value,
            }));
          }}
          className=" p-2.5   bg-white border  shadow-sm outline-none appearance-none focus:border-indigo-600 rounded-2xl my-2 py-2 px-3 text-gray-600"
        >
          <option value="" disabled>
            Choisir une catégorie
          </option>
          <option value="Flatsharing">Colocation</option>
          <option value="Renting">Location</option>
        </select>

        {/* Price */}
        <div className="relative p-2.5  bg-white border shadow-sm outline-none appearance-none focus:border-indigo-600 rounded-2xl my-2 py-2 px-3 text-gray-600">
          {isPriceSelected ? (
            <input
              type="text"
              value={filter.price}
              onChange={(e) => {
                setFilter((prev) => ({
                  ...prev,
                  price: e.target.value,
                }));
              }}
              placeholder="Entrez un prix personnalisé"
              className=" p-2.5  bg-white border  shadow-sm outline-none appearance-none focus:border-indigo-600 rounded-2xl my-2 py-2 px-3 text-gray-600"
            />
          ) : (
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
              className=" p-2.5  bg-white border  shadow-sm outline-none appearance-none focus:border-indigo-600 rounded-2xl my-2 py-2 px-3 text-gray-600"
            >
              <option value="" disabled>
                Sélectionner un prix
              </option>
              <option value="custom">Votre prix</option>
              <option value="50000">50000 DA ou moins</option>
              <option value="20000">20000 DA ou moins</option>
            </select>
          )}
        </div>

        {/* Wilaya */}
        <select
          value={filter.wilaya}
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              wilaya: e.target.value,
            }));
          }}
          className=" p-2.5  bg-white border shadow-sm outline-none appearance-none focus:border-indigo-600 rounded-2xl my-2 py-2 px-3 text-gray-600"
        >
          <option value="" disabled>
            sélectionner une wilaya
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

        {/* Commune */}
        <select
          value={filter.commune}
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              commune: e.target.value,
            }));
          }}
          className=" p-2.5  bg-white border  shadow-sm outline-none appearance-none focus:border-indigo-600 rounded-2xl my-2 py-2 px-3 text-gray-600"
        >
          <option value="" disabled>
            sélectionner une commune
          </option>
          {communes.map((commune, i) => {
            return commune["wilaya_id"] === filter.wilaya ? (
              <option value={commune.title} key={i}>
                {commune.title}
              </option>
            ) : null;
          })}
        </select>

        {/* Contract Type */}
        <select
          value={filter.contractType}
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,

              contractType: e.target.value,
            }));
          }}
          className=" p-2.5  bg-white border  shadow-sm outline-none appearance-none focus:border-indigo-600 rounded-2xl my-2 py-2 px-3 text-gray-600"
        >
          <option value="" disabled>
            Sélectionner un contrat
          </option>
          <option value="Annuel">Annuel</option>
          <option value="Mensuel">Mensuel</option>
        </select>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                      {property.price} DA / Mois
                    </dd>
                  </div>

                  <div>
                    <dt className="sr-only">Address</dt>

                    <dd className="font-medium">
                      {property.location}, <span>{property.commune}-</span>
                      <span>{property.wilaya}</span>
                    </dd>
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
                      <p className="text-gray-500">Categorie</p>

                      <p className="font-medium">{property.category}</p>
                    </div>
                  </div>

                  <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                    <svg
                      className="h-4 w-4 text-primary"
                      viewBox="0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#30a2ff"
                      stroke="currentColor"
                    >
                      <path d="M52 12H44V4a4 4 0 00-4-4h-8a4 4 0 00-4 4v8H12a4 4 0 00-4 4v32a4 4 0 004 4h40a4 4 0 004-4V16a4 4 0 00-4-4zm-4 34H16V18h32v28zm0-32H16v-4h32v4z"></path>
                      <path d="M24 42h16v4H24z"></path>
                    </svg>

                    <div className="mt-1.5 sm:mt-0">
                      <p className="text-gray-500">Contrat</p>

                      <p className="font-medium">{property.contractType}</p>
                    </div>
                  </div>

                  <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                    <svg
                      className="h-4 w-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>

                    <div className="mt-1.5 sm:mt-0">
                      <p className="text-gray-500">Publié</p>

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
    </section>
  );
};

export default ActiveProperties;
