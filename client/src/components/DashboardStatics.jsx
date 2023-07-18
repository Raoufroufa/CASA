import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext.jsx";

const Dashboard = () => {
  const { decodedToken } = useContext(UserContext);

  useEffect(() => {
    if (decodedToken) {
      axios.get("/dashboard/count").then((response) => {
        setDashboardData(response.data);
      });
    }
  }, [decodedToken]);

  const [dashboardData, setDashboardData] = useState(null);
  const userIcon = (
    <svg
      className="flex-shrink-0 w-6 h-6 mt-2 text-primary transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 18"
    >
      <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
    </svg>
  );
  const propertyIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="flex-shrink-0 w-6 h-6 mt-2 text-primary transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
      />
    </svg>
  );

  const postIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="flex-shrink-0 w-6 h-6 mt-2 text-primary transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  );

  return decodedToken ? (
    <div className=" grid gap-x-4 gap-y-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
      {dashboardData &&
        Object.entries(dashboardData).map(([key, value]) => (
          <Link
            to=""
            key={key}
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className=" text-2xl font-semibold md:font-bold  tracking-tight text-gray-600 dark:text-white">
              Total {key.replace(/([A-Z])/g, " $1").toLowerCase()}:
            </h5>
            <div className="text-2xl font-semibold text-gray-700 dark:text-gray-400 mt-2">
              {value}{" "}
              {(key === "decodedTokens" || key === "clients" || key === "owners") &&
                userIcon}
              {(key === "properties" ||
                key === "activeProperties" ||
                key === "inactiveProperties" ||
                key === "rentingProperties" ||
                key === "flatsharingProperties") &&
                propertyIcon}
              {(key === "posts" ||
                key === "activePosts" ||
                key === "inactivePosts") &&
                postIcon}
            </div>
          </Link>
        ))}
    </div>
  ) : (
    <div className="flex justify-center items-center">
      <div className="text-center">
        <h2 className="text-xl md:text-3xl font-bold mb-4 text-primary">
          Welcome to your dashboard
        </h2>
        <p className="text-lg md:text-xl text-gray-500">
          Sign in to get your data
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
