import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";
import axios from "axios";

const SettingsProfile = () => {
  const { decodedToken, setToken } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: decodedToken.id,
      name,
      email,
      password,
    };
    try {
      const response = await axios.patch(
        "/users/" + decodedToken.id,
        updatedUser
      );
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      alert("Your profile has been updated successful");
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <form
      className="flex flex-col border border-gray-300 rounded-lg shadow-xl p-8"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4 text-primary text-center">
        Edit your informations
      </h2>

      <label className="text-xl mt-4 text-gray-600">Full-name</label>
      <input
        type="text"
        placeholder={decodedToken.name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className="text-xl mt-4 text-gray-600">Email</label>
      <input
        type="email"
        placeholder={decodedToken.email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="text-xl mt-4 text-gray-600">Password</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button className="  primary mt-8 hover:bg-primaryH">Update</button>
    </form>
  );
};

export default SettingsProfile;
