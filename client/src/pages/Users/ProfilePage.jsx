import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PropertiesPage from "../Properties/PropertiesPage.jsx";
import AccountNav from "../../components/AccountNav.jsx";
import PostsPage from "../Posts/PostsPage.jsx";
import SettingsProfile from "../../components/SettingsProfile.jsx";
import { FaTrash } from "react-icons/fa";

function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, setToken, decodedToken, setDecodedToken } =
    useContext(UserContext);

  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/auth/logout");

    setRedirect("/");
    setDecodedToken(null);
    setToken(null);
    localStorage.removeItem("token");
  }

  const handleDeleteUser = (userId) => {
    // Perform the deletion logic using the userId
    // For example, send a DELETE request to the server
    axios
      .delete(`/users/${userId}`)
      .then(() => {
        // If deletion is successful, update the user state
        setDecodedToken(null);
        setToken(null);
        alert("Utilisateur supprimé avec succès");
        window.location.href("/");
      })
      .catch((error) => {
        // Handle error case
        console.error("Error deleting account:", error);
      });
  };

  if (!ready) {
    return "Loading...";
  }

  if (ready && !decodedToken && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <>
          <div className="text-center mt-10 mx-auto px-4 max-w-screen-xl md:px-8">
            <p className=" text-base md:text-lg font-bold text-gray-600 ">
              Bienvenue {decodedToken.name}{" "}
            </p>

            <button
              onClick={logout}
              className="primary max-w-sm my-8 hover:bg-primaryH"
            >
              Se déconnecter
            </button>
            <button
              onClick={() => handleDeleteUser(decodedToken.id)}
              className=" primary max-w-sm  mb-8  flex items-center space-x-2 mx-auto hover:bg-red-500"
            >
              <div className="mx-auto flex items-center space-x-2">
                <FaTrash />
                <span>Supprimer le compte</span>
              </div>
            </button>
          </div>

          <SettingsProfile />
        </>
      )}
      {subpage === "properties" && <PropertiesPage />}
      {subpage === "posts" && <PostsPage />}
    </div>
  );
}

export default ProfilePage;
