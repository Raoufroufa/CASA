import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const ActivePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/posts/home").then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div className="mt-36 mx-auto px-4 max-w-screen-xl md:px-8 ">
      <div className="text-center">
        <h1 className="text-3xl text-gray-700 font-semibold">
          Découvrez un monde d'opportunités avec{" "}
          <span className=" text-primary">LA CASA</span>
        </h1>
        <p className="mt-6 text-gray-500 text-lg">
          Bienvenue sur la page des publications de{" "}
          <strong className=" text-primary">LA CASA</strong>, votre passerelle
          vers un monde d'opportunités passionnantes.{" "}
        </p>
      </div>
      <div className=" mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts?.length > 0 &&
          posts.map((post, index) => (
            <div
              key={index}
              className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 hover:shadow-2xl hover:shadow-blue-300"
            >
              <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-300 via-primary to-blue-700"></span>

              <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 sm:text-xl">
                    {post.title}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-gray-600">
                    Par {post.creator.name}
                  </p>
                </div>

                <div className="hidden sm:block sm:shrink-0">
                  <div className="w-6 h-6 md:w-10 md:h-10 bg-primary text-white flex items-center justify-center rounded-full">
                    {post.creator.name.charAt(0)}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="max-w-[40ch] text-sm text-gray-500 line-clamp-2">
                  {post.description}
                </p>
              </div>

              <dl className="mt-6 flex gap-4 sm:gap-6">
                <div className="flex flex-col-reverse">
                  <dt className="text-sm font-medium text-gray-600">Publiée</dt>
                  <dd className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
              <Link
                to={"/post/" + post._id}
                className="absolute bottom-7 right-3 px-3 py-1 text-white font-medium rounded-full bg-primary hover:bg-primaryH"
              >
                Lire
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ActivePosts;
