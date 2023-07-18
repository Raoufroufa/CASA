import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Logo from "../images/Logo.png";
import jwt_decode from "jwt-decode";
// import { UserContext } from "../context/UserContext.jsx";

const ForgetPasswordPage = () => {
    // const { decodedToken } = useContext(UserContext);
    
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
const [confirmNewPassword, setConfirmNewPassword] = useState("");
    
 const navigate = useNavigate();

     const handleResetPassword = async (e) => {
         e.preventDefault();
         if (newPassword !== confirmNewPassword) {
           alert("Passwords do not match. Please try again.");
           return;
         }
       try {
          const response = await axios.post("/auth/forgot-password", {
           email,
           newPassword,
          });
          
          alert("Reseting successful. Now you can log in");
          // Redirect to the user to login page

            const decodedToken = jwt_decode(response.data.token);

            if (decodedToken.role === "Admin") {
              navigate("/dashboard/login");
            } else {
              navigate("/login");
            }
         
       } catch (error) {
         alert("Reseting failed. Please try again later");
       }
     };
 
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center sm:px-4 mt-10 mb-10">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <img src={Logo} width={150} className="mx-auto" alt="Casa logo" />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Editing your Password
            </h3>
          </div>
        </div>
        <div className="bg-white shadow-lg p-4 py-8 sm:p-6 sm:rounded-lg">
          <form onSubmit={handleResetPassword} className="space-y-5">
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
              <label className="font-medium">New Password</label>
              <input
                type="password"
                required
                placeholder="your new password"
                value={newPassword}
                onChange={(ev) => setNewPassword(ev.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Confirm new password</label>
              <input
                type="password"
                placeholder="confirm your new password"
                value={confirmNewPassword}
                onChange={(ev) => setConfirmNewPassword(ev.target.value)}
                className="w-full border my-1 py-2 px-3 rounded-2xl"
              />
            </div>
            <button className="w-full px-4 py-2 text-white font-medium bg-primary hover:bg-primaryH active:bg-primary rounded-lg duration-150">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default ForgetPasswordPage