import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Logo from "../../images/Logo.png";

// still to check for profilePicture  and after change userModel. Don't forget the role of the user
function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Client"); // Default role is 'client'

  const navigate = useNavigate();

  async function registerUser(ev) {
    ev.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    try {
      await axios.post("/auth/register", {
        name,
        email,
        password,
        role, 
      });

      alert("Registration successful. Now you can log in");

      // Redirect to the user to login page
      navigate("/login");
    } catch (e) {
      alert("Registration failed. Please try again later");
    }
  }
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center sm:px-4 mt-10 mb-10">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <img src={Logo} width={150} className="mx-auto" alt="Casa logo" />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Create an account
            </h3>
            <p className="">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-medium text-primary hover:text-primaryH"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
        <div className="bg-white shadow-lg p-4 py-8 sm:p-6 sm:rounded-lg">
          <form onSubmit={registerUser} className="space-y-5">
            <div>
              <label className="font-medium">Full-name</label>
              <input
                type="text"
                required
                placeholder="Your full-name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                required
                placeholder="your password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Confirm password</label>
              <input
                type="password"
                placeholder="confirm your password"
                value={confirmPassword}
                onChange={(ev) => setConfirmPassword(ev.target.value)}
                className="w-full border my-1 py-2 px-3 rounded-2xl"
              />
            </div>
            <div>
              <span className="mr-4">I am:</span>
              <label>
                <input
                  type="radio"
                  value="client"
                  checked={role === "Client"}
                  onChange={() => setRole("Client")}
                  className="mr-1"
                />
                Client
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  value="owner"
                  checked={role === "Owner"}
                  onChange={() => setRole("Owner")}
                  className="mr-1"
                />
                Owner
              </label>
            </div>
            <button className="w-full px-4 py-2 text-white font-medium bg-primary hover:bg-primaryH active:bg-primary rounded-lg duration-150">
              Create account
            </button>
          </form>
          {/* <div className="mt-5">
            <button className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
              <svg
                className="w-5 h-5"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath ="url(#clip0_17_40)">
                  <path
                    d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                    fill="#34A853"
                  />
                  <path
                    d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_17_40">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Continue with Google
            </button>
          </div> */}
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
