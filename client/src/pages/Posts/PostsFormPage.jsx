import React from 'react';
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AccountNav from "../../components/AccountNav.jsx";
import { Navigate, useParams } from "react-router-dom";

import { UserContext } from "../../context/UserContext.jsx";

function PostsFormPage() {
  const { decodedToken } = useContext(UserContext);

  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/posts/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setDescription(data.description);
    });
  }, [id]);

    function inputHeader(text) {
      return <h2 className="text-2xl mt-4 text-gray-700">{text}</h2>;
    }

    function inputDescription(text) {
      return <p className="text-gray-500 text-sm">{text}</p>;
    }

    function preInput(header, description) {
      return (
        <>
          {inputHeader(header)}
          {inputDescription(description)}
        </>
      );
  }
  
  async function savePost(ev) {
    ev.preventDefault();
    const postData = {
      creator: decodedToken.id,
      title,
      description,
    };
    if (id) {
      // update
      await axios.patch("/posts/" + id, postData);
      setRedirect(true);
    } else {
      // new post
      await axios.post("/posts", postData);
      setRedirect(true);
    }
  }

   if (redirect) {
     return <Navigate to={"/account/posts"} />;
   }


  return (
    <div>
      <AccountNav />
      <form
        onSubmit={savePost}
        className="border border-gray-300 rounded-lg shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">
          {id ? "Editing" : "Creating"} a Post
        </h2>
        {preInput(
          "Title",
          "Title for your propety. should be short and catchy as in advertisement"
        )}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: I amm looking for a house"
        />
        {preInput("Description", "Description of the post")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />

        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}

export default PostsFormPage