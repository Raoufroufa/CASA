import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext.jsx";
import Logo from "../../images/Logo.png";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setReady, setToken } = useContext(UserContext);
  

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });
      // Extract the token from the response
      const token = response.data.token;
      localStorage.setItem("token", token);
      setToken(token);
      setReady(true);
      alert("Connexion réussie");
      setRedirect(true);
    } catch (e) {
      if (e.code === "ERR_BAD_REQUEST") {
        // Handle the bad request error
        console.log("Bad request:", e.message);
      } else {
        // Handle other types of errors
        console.log("An error occurred:", e.message);
      }
      alert("Échec de la connexion");
    }
      

  }
   

  if (redirect) {
    return <Navigate to={"/account"} />;
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center  ">
      <div className="max-w-sm w-full text-gray-600  space-y-5 shadow-2xl p-4 ">
        <div className="text-center pb-6">
          <img src={Logo} width={150} className="mx-auto" alt="Casa logo" />

          <h3 className="text-gray-800 text-lg  font-bold ">
            Connectez-vous à votre compte
          </h3>
          <p className="text-center mt-2">
            Vous n'avez pas de compte?{" "}
            <Link
              to={"/register"}
              className="font-medium text-primary hover:text-primaryH"
            >
              S'inscrire
            </Link>
          </p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <div>
            <label className="font-medium">E-mail</label>
            <input
              type="email"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primaryH shadow-sm rounded-lg"
              placeholder="votre@email.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div>
            <label className="font-medium">Mot de passe</label>
            <input
              type="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primaryH shadow-sm rounded-lg"
              placeholder="votre mot de passe"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <Link
              to="/forgot-password"
              className="text-center text-primary hover:text-primaryH"
            >
              Mot de passe oublié?
            </Link>
          </div>
          <button className="w-full px-4 py-2 text-white font-medium bg-primary hover:bg-primaryH active:bg-primaryR rounded-lg duration-150">
            Se connecter
          </button>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
