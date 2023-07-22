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
      alert("Votre profil a été mis à jour avec succès");
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <form
      className="flex flex-col tems-center justify-center border border-gray-300 rounded-lg shadow-xl p-8 mx-auto  max-w-screen-xl "
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4 text-primary text-center">
        Modifiez vos informations
      </h2>

      <label className="text-xl mt-4 text-gray-600">Nom et prénom</label>
      <input
        type="text"
        placeholder={decodedToken.name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className="text-xl mt-4 text-gray-600">E-mail</label>
      <input
        type="email"
        placeholder={decodedToken.email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="text-xl mt-4 text-gray-600">Mot de passe</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button className="  primary mt-8 hover:bg-primaryH">Modifier</button>
    </form>
  );
};

export default SettingsProfile;
