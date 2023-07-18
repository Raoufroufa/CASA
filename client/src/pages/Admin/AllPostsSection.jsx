import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext.jsx";

const AllPosts = () => {
  const { decodedToken } = useContext(UserContext);

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    if (decodedToken) {
      axios.get("/posts").then((response) => {
        setAllPosts(response.data);
      });
    }
  }, [decodedToken]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-primary text-xl font-bold sm:text-2xl">
            All posts
          </h3>
          {decodedToken ? (
            <p className="text-gray-600 mt-2">Posts data</p>
          ) : (
            <p className="text-gray-600 mt-2">Sign in to get your data</p>
          )}
        </div>
      </div>
      <div className="mt-12 relative h-max overflow-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 pr-6">title</th>
              <th className="py-3 pr-6">creator</th>
              <th className="py-3 pr-6">date</th>
              <th className="py-3 pr-6">status</th>
              <th className="py-3 pr-6">description</th>
              <th className="py-3 pr-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {allPosts.map((post, idx) => (
              <tr key={idx}>
                <td className="pr-6 py-4 whitespace-nowrap">{post.title}</td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  {post.creator.name}
                </td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  {new Date(post.createdAt).toLocaleString()}
                </td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-2 rounded-full font-semibold text-xs ${
                      post.status
                        ? "text-green-600 bg-green-50"
                        : "text-gray-600 bg-gray-50"
                    }`}
                  >
                    {post.status ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  {post.description}
                </td>

                <td className="text-right whitespace-nowrap">
                  <Link
                    to={`/dashboard/post/${post._id}`}
                    className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
                  >
                    Manage
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPosts;
