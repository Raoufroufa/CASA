import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";

function PostPage() {
  const { decodedToken } = useContext(UserContext);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [refetsh, setRefetsh] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/posts/${id}`).then((response) => {
      setPost(response.data);
    });

    axios.get(`/comments/post/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id, refetsh]);

  async function handleToggleStatus() {
    try {
      // Make an API call to update the post status
      await axios.patch("/posts/" + id, {
        status: !post.status,
      });

      // Update the post state with the updated status
      setPost((prevState) => ({
        ...prevState,
        status: !prevState.status,
      }));

      // Display a success message to the user
      alert("Post status updated successfully!");
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error("Failed to toggle post status:", error);
      alert("Failed to toggle post status. Please try again.");
    }
  }

  async function handleDeletePost() {
    try {
      // Make an API call to delete the property
      await axios.delete(`/posts/${post._id}`);

      // Redirect the user to a different page or display a success message
      alert("Property deleted successfully!");
      if (decodedToken.role === "Admin") {
        navigate("/dashboard/posts");
      } else {
        navigate("/account/posts");
      }
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error("Failed to delete property:", error);
      alert("Failed to delete property. Please try again.");
    }
  }

  async function handleCommentSubmit() {
    try {
      // Make an API call to submit the comment
      await axios.post("/comments/addcomment", {
        text: commentText,
        targetId: id,
      });

      setRefetsh(!refetsh);

      // Clear the comment text field
      setCommentText("");

      // Display a success message to the user
      alert("Comment submitted successfully!");
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error("Failed to submit comment:", error);
      alert("Failed to submit comment. Please try again.");
    }
  }

  async function handleDeleteComment(commentId) {
    try {
      // Make an API call to delete the comment
      await axios.delete(`/comments/${commentId}`);

      // Update the comments state by removing the deleted comment
      setComments(comments.filter((comment) => comment._id !== commentId));

      // Display a success message to the user
      alert("Comment deleted successfully!");
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error("Failed to delete comment:", error);
      alert("Failed to delete comment. Please try again.");
    }
  }

  async function handleEditComment(commentId) {
    try {
      // Prompt the user to enter the updated comment text
      const updatedCommentText = prompt("Enter the updated comment:");
      // Check if the user entered a comment text
      if (updatedCommentText) {
        // Make an API call to update the comment
        await axios.patch(`/comments/${commentId}`, {
          text: updatedCommentText,
          targetId: id,
        });

        setRefetsh(!refetsh);

        // Display a success message to the user
        alert("Comment submitted successfully!");
      } else {
        // Display a message indicating that the comment text cannot be empty
        alert("Comment text cannot be empty. Please try again.");
      }
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error("Failed to submit comment:", error);
      alert("Failed to submit comment. Please try again.");
    }
  }
  if (!post) return "";

  return (
    <article className="rounded-xl bg-white p-4 ring ring-blue-50 sm:p-6 lg:p-8">
      <div className="flex items-start sm:gap-8">
        <div
          className="hidden sm:grid sm:h-20 sm:w-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-primary"
          aria-hidden="true"
        >
          <div className="flex items-center gap-1">
            <span className="h-8 w-0.5 rounded-full bg-primary"></span>
            <span className="h-6 w-0.5 rounded-full bg-primary"></span>
            <span className="h-4 w-0.5 rounded-full bg-primary"></span>
            <span className="h-6 w-0.5 rounded-full bg-primary"></span>
            <span className="h-8 w-0.5 rounded-full bg-primary"></span>
          </div>
        </div>

        <div className="flex-grow">
          {decodedToken?.role !== "Admin" && (
            <Link to="/account">
              <strong className="rounded border border-primary bg-primary hover:bg-primaryH px-3 py-1.5 text-[14px] font-medium text-white">
                Back
              </strong>
            </Link>
          )}

          {decodedToken?.role === "Admin" && (
            <div className="flex justify-end space-x-3  ">
              <button
                onClick={handleToggleStatus}
                className="rounded border border-primary bg-primary hover:bg-primaryH px-3 py-1.5 text-[14px] font-medium text-white"
              >
                {post.status ? "Deactivate" : "Activate"}
              </button>
              <button
                onClick={handleDeletePost}
                className="rounded border border-red-500 bg-red-500 hover:bg-red-600 px-3 py-1.5 text-[14px] font-medium text-white"
              >
                Delete
              </button>
            </div>
          )}
          {decodedToken?.id === post.creator._id && (
            <div className="flex justify-end space-x-3  ">
              <button
                onClick={handleDeletePost}
                className="rounded border border-red-500 bg-red-500 hover:bg-red-600 px-3 py-1.5 text-[14px] font-medium text-white"
              >
                Delete
              </button>
            </div>
          )}
          <h3 className="mt-4 text-lg font-medium sm:text-xl">
            <div className="hover:underline"> {post.title} </div>
          </h3>

          <p className="mt-1 text-sm text-gray-700">{post.description}</p>

          <div className="mt-4 sm:flex sm:items-center sm:gap-2">
            <div className="flex items-center gap-1 text-gray-500">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>

              <p className="text-xs font-medium">
                {new Date(post.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>

          <p className=" font-medium mt-3 text-gray-700 underline ">
            Comments:
          </p>
          <ul className="mt-4 space-y-2">
            {comments?.length > 0 ? (
              <li>
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="block h-full rounded-lg border border-blue-100 p-3 hover:border-blue-300 mt-2 relative"
                  >
                    <strong className="font-medium text-gray-600">
                      {comment.creator?.name}
                    </strong>
                    {decodedToken?.id &&
                      (decodedToken.role === "Admin" ? (
                        <div className="absolute top-2 right-2 flex gap-2">
                          <button
                            className="text-red-500 hover:text-red-600 bg-white "
                            onClick={() => handleDeleteComment(comment._id)}
                          >
                            <FaTrash className="m-1" />
                          </button>
                        </div>
                      ) : (
                        decodedToken.id === comment.creator.id && (
                          <div className="absolute top-2 right-2 flex gap-2">
                            <button
                              className="text-red-500 hover:text-red-600 bg-white "
                              onClick={() => handleDeleteComment(comment._id)}
                            >
                              <FaTrash className="m-1" />
                            </button>
                            <button
                              className="text-primary hover:text-primaryH bg-white"
                              onClick={() => handleEditComment(comment._id)}
                            >
                              <AiOutlineEdit className="m-1" />
                            </button>
                          </div>
                        )
                      ))}

                    <p className="mt-1 text-xs font-medium text-gray-500">
                      {comment.text}
                    </p>
                  </div>
                ))}
              </li>
            ) : (
              <li>
                <div className="block h-full rounded-lg border border-blue-100 p-3 hover:border-blue-300">
                  <strong className="font-medium text-gray-600">
                    No comment yet.
                  </strong>
                </div>
              </li>
            )}
          </ul>

          {decodedToken && decodedToken.role !== "Admin" && (
            <>
              <button onClick={handleCommentSubmit} className="mt-4">
                <strong className="rounded border border-primary bg-primary hover:bg-primaryH px-3 py-1.5 text-[14px] font-medium text-white">
                  Comment
                </strong>
              </button>
              <textarea
                rows={3}
                placeholder="Write your comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="block h-full rounded-lg border border-blue-100 p-3 hover:border-blue-300 mt-3"
              ></textarea>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default PostPage;
