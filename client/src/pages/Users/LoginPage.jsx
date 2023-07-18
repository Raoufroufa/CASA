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
      alert("Login successful");
      setRedirect(true);
    } catch (e) {
      if (e.code === "ERR_BAD_REQUEST") {
        // Handle the bad request error
        console.log("Bad request:", e.message);
      } else {
        // Handle other types of errors
        console.log("An error occurred:", e.message);
      }
      alert("Login failed");
    }
      

  }
   

  if (redirect) {
    return <Navigate to={"/account"} />;
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4 ">
      <div className="max-w-sm w-full text-gray-600  space-y-5 ">
        <div className="text-center pb-8">
          <img src={Logo} width={150} className="mx-auto" alt="Casa logo" />
          <div className="mt-5">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
          </div>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primaryH shadow-sm rounded-lg"
              placeholder="your@email.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primaryH shadow-sm rounded-lg"
              placeholder="your password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <Link
              to="/forgot-password"
              className="text-center text-primary hover:text-primaryH"
            >
              Forgot password?
            </Link>
          </div>
          <button className="w-full px-4 py-2 text-white font-medium bg-primary hover:bg-primaryH active:bg-primaryR rounded-lg duration-150">
            Sign in
          </button>
        </form>
       
        <p className="text-center">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="font-medium text-primary hover:text-primaryH"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
