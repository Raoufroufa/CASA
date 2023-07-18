import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext.jsx";

const Users = () => {
  const { decodedToken } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (decodedToken) {
      axios.get("/users").then((response) => {
        setUsers(response.data);
      });
    }
  }, [decodedToken]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-primary text-xl font-bold sm:text-2xl">Users</h3>
          {decodedToken ? (
            <p className="text-gray-600 mt-2">Users data</p>
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
              <th className="py-3 px-6">Role</th>

              <th className="py-3 px-6">Creation date</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {users.map((user, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
