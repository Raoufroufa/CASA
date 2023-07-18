import React from "react";
import PhotosUploader from "../../components/PhotosUploader.jsx";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AccountNav from "../../components/AccountNav.jsx";
import { Navigate, useParams } from "react-router-dom";

import { UserContext } from "../../context/UserContext.jsx";
import wilayas from "../../data/wilayas.json";
import communes from "../../data/communes.json";
function PropertiesFormPage() {
  const { decodedToken } = useContext(UserContext);

  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [category, setcategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [contractType, setContractType] = useState("");
  const [price, setPrice] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [wilaya, setWilaya] = useState("");
  const [commune, setCommune] = useState("");

  useEffect(() => {
    setCommune("");
  }, [wilaya]);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/properties/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setcategory(data.category);
      setLocation(data.location);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setContractType(data.contractType);
      setPrice(data.price);

      setWilaya(data.wilaya);
      setCommune(data.commune);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4 text-gray-700">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function saveProperty(ev) {
    ev.preventDefault();
    const propertyData = {
      creator: decodedToken.id,
      title,
      category,
      description,
      location,
      contractType,
      price,
      photos: addedPhotos,
      wilaya,
      commune,
    };
    if (id) {
      // update
      await axios.patch("/properties/" + id, propertyData);
      setRedirect(true);
    } else {
      // new property
      await axios.post("/properties", propertyData);
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to={"/account/properties"} />;
  }

  return (
    <div>
      <AccountNav />
      <form
        onSubmit={saveProperty}
        className="border border-gray-300 rounded-lg shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">
          {id ? "Editing" : "Creating"} a Property
        </h2>
        {preInput(
          "Title",
          "Title for your propety. should be short and catchy as in advertisement"
        )}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: beautiful apt"
        />
        {preInput(
          "Category",
          "Category for your property. Should be Renting or Flatsharing"
        )}
        <div className="flex items-center space-x-6 mt-2">
          <label htmlFor="FlatSharing" className="flex items-center space-x-2">
            <input
              type="radio"
              value="Flatsharing"
              id="FlatSharing"
              name="category"
              checked={category === "Flatsharing"}
              onChange={(ev) => setcategory(ev.target.value)}
              className="form-radio h-4 w-4 text-primary"
            />
            <span className="text-sm">Flatsharing</span>
          </label>
          <label htmlFor="Renting" className="flex items-center space-x-2">
            <input
              type="radio"
              value="Renting"
              id="Renting"
              name="category"
              checked={category === "Renting"}
              onChange={(ev) => setcategory(ev.target.value)}
              className="form-radio h-4 w-4 text-primary"
            />
            <span className="text-sm">Renting</span>
          </label>
        </div>

        {preInput("Location", "Location to this property")}

        <div className="flex gap-5">
          <select
            className="w-[25%]"
            value={wilaya}
            onChange={(e) => setWilaya(e.target.value)}
          >
            <option disabled value="">
              wilaya
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
            className="w-[25%]"
            value={commune}
            onChange={(e) => setCommune(e.target.value)}
          >
            <option disabled value="">
              Commune
            </option>
            {communes.map((commune, i) => {
              return commune["wilaya_id"] === wilaya ? (
                <option value={commune.title} key={i}>
                  {commune.title}
                </option>
              ) : null;
            })}
          </select>
          <input
            className="w-[50%]"
            type="text"
            value={location}
            onChange={(ev) => setLocation(ev.target.value)}
            placeholder="location"
          />
        </div>

        {preInput("Photos", "more = better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "Description of the property")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />

        {preInput("Contarct Type", "Contarct Type to this property")}
        <div className="flex items-center space-x-6 mt-2">
          <label htmlFor="Annuel" className="flex items-center space-x-2">
            <input
              type="radio"
              value="Annuel"
              id="Annuel"
              name="contrat"
              checked={contractType === "Annuel"}
              onChange={(ev) => setContractType(ev.target.value)}
              className="form-radio h-4 w-4 text-primary"
            />
            <span className="text-sm">Annuel</span>
          </label>
          <label htmlFor="Mensuel" className="flex items-center space-x-2">
            <input
              type="radio"
              value="Mensuel"
              id="Mensuel"
              name="contrat"
              checked={contractType === "Mensuel"}
              onChange={(ev) => setContractType(ev.target.value)}
              className="form-radio h-4 w-4 text-primary"
            />
            <span className="text-sm">Mensuel</span>
          </label>
        </div>
        {/* <input
          type="text"
          value={contractType}
          onChange={(ev) => setContractType(ev.target.value)}
          placeholder="contract Type"
        /> */}

        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Price per month</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}

export default PropertiesFormPage;
