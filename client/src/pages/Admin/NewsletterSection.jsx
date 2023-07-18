import React, { useState, useContext } from "react";
import Logo from "../../images/Logo.png";
import axios from "axios";
import { UserContext } from "../../context/UserContext.jsx";

const NewsletterSection = () => {
  const { decodedToken } = useContext(UserContext);


  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/dashboard/newsletter", { subject, message });
      setMessage("");
      setSubject("");
      alert("Emails sent successfully");
      console.log("Emails sent successfully");
    } catch (error) {
      alert(error.message);
      console.error("Failed to send emails", error);
    }
  };


  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <img src={Logo} width={150} className="mx-auto" alt="La casa logo" />
        </div>
        <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
              Create your newsletter
            </p>
          </div>
          {decodedToken ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-medium">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Text</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                />
              </div>
              <button className="w-full px-4 py-2 text-white font-medium bg-primary hover:bg-primaryH active:bg-primaryR rounded-lg duration-150">
                Send
              </button>
            </form>
          ) : (
            <div className="text-center font-semibold">
              {" "}
              Sign in to send letters to your users
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default NewsletterSection