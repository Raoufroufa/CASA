import React from 'react';
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext.jsx";
import { FaTrash } from "react-icons/fa";


const Owners = () => {
  const { decodedToken } = useContext(UserContext);

  const [owners, setOwners] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    if (decodedToken) {
      axios.get("/users/owners").then((response) => {
        setOwners(response.data);
      });
    }
  }, [decodedToken]);
  
  const handleDeleteUser = (userId) => {
    // Perform the deletion logic using the userId
    // For example, send a DELETE request to the server
    axios
      .delete(`/users/${userId}`)
      .then(() => {
        // If deletion is successful, update the user state
        alert("User deleted successfully");
        // Update the owners state by removing the deleted owner
        setOwners((prevOwners) =>
          prevOwners.filter((owner) => owner._id !== userId)
        );
      })
      .catch((error) => {
        // Handle error case
        console.error("Error deleting account:", error);
      });
  };


  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-primary text-xl font-bold sm:text-2xl">Owners</h3>
          {decodedToken ? (
            <p className="text-gray-600 mt-2">Owners data</p>
          ) : (
            <p className="text-gray-600 mt-2">Sign in to get your data</p>
          )}
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Full-name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Creation date</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {owners.map((owner, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{owner.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{owner.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(owner.createdAt).toLocaleString()}
                </td>

                <td className="text-right px-6 whitespace-nowrap">
                  <button
                    onClick={() => handleDeleteUser(owner._id)}
                    className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="mx-auto flex items-center space-x-2">
                      <FaTrash />
                      <span>Delete</span>
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Owners