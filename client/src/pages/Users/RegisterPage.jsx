import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Logo from "../../images/Logo.png";


function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Client"); 

  const navigate = useNavigate();

  async function registerUser(ev) {
    ev.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas. Veuillez réessayer.");
      return;
    }
    try {
      await axios.post("/auth/register", {
        name,
        email,
        password,
        role, 
      });

      alert("Inscription réussi. Vous pouvez maintenant vous connecter");

      // Redirect to the user to login page
      navigate("/login");
    } catch (e) {
      alert("Échec de l'enregistrement. Veuillez réessayer plus tard");
    }
  }
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4 mt-36 md:mt-16 mb-28">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md ">
        <div className="text-center">
          <img src={Logo} width={150} className="mx-auto" alt="Casa logo" />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Create an account
            </h3>
            <p className="">
              Vous avez déjà un compte?{" "}
              <Link
                to={"/login"}
                className="font-medium text-primary hover:text-primaryH"
              >
                Connexion
              </Link>
            </p>
          </div>
        </div>
        <div className="bg-white shadow-2xl p-4 py-8 sm:p-6 sm:rounded-lg">
          <form onSubmit={registerUser} className="space-y-5">
            <div>
              <label className="font-medium">Nom et prénom</label>
              <input
                type="text"
                required
                placeholder="Votre nom complet"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">E-mail</label>
              <input
                type="email"
                required
                placeholder="votre@email.com"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Mot de passe</label>
              <input
                type="password"
                required
                placeholder="votre mot de passe"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Confirmez le mot de passe</label>
              <input
                type="password"
                placeholder="Confirmez votre mot de passe"
                value={confirmPassword}
                onChange={(ev) => setConfirmPassword(ev.target.value)}
                className="w-full border my-1 py-2 px-3 rounded-2xl"
              />
            </div>
            <div>
              <span className="mr-4">Je suis:</span>
              <label>
                <input
                  type="radio"
                  value="client"
                  checked={role === "Client"}
                  onChange={() => setRole("Client")}
                  className="mr-1"
                />
                Locataire
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  value="owner"
                  checked={role === "Owner"}
                  onChange={() => setRole("Owner")}
                  className="mr-1"
                />
                Propriétaire
              </label>
            </div>
            <button className="w-full px-4 py-2 text-white font-medium bg-primary hover:bg-primaryH active:bg-primary rounded-lg duration-150">
              Créer un compte
            </button>
          </form>
          
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
