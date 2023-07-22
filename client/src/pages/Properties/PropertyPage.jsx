import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import axios from "axios";
import PropertyGallery from "../../components/PropertyGallery.jsx";
import AddressLink from "../../components/AddressLink.jsx";
import { FaTrash } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";

function PropertyPage() {
  const { decodedToken } = useContext(UserContext);
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [refetsh, setRefetsh] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/properties/${id}`).then((response) => {
      setProperty(response.data);
    });

    axios.get(`/comments/property/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id, refetsh]);

  async function handleToggleStatus() {
    try {
      // Make an API call to update the property status
      await axios.patch("/properties/" + id, {
        status: !property.status,
      });

      // Update the property state with the updated status
      setProperty((prevState) => ({
        ...prevState,
        status: !prevState.status,
      }));

      // Display a success message to the user
      alert("Property status updated successfully!");
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error("Failed to toggle property status:", error);
      alert("Failed to toggle property status. Please try again.");
    }
  }

  async function handleDeleteProperty() {
    try {
      // Make an API call to delete the property
      await axios.delete(`/properties/${property._id}`);
      // Redirect the user to a different page or display a success message
      alert("Propriété supprimée avec succès !");
      if (decodedToken.role === "Admin") {
        navigate("/dashboard/properties");
      } else {
        navigate("/account/properties");
      }
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error("Failed to delete property:", error);
      alert("Échec de la suppression de la propriété. Veuillez réessayer.");
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
      alert("Commentaire envoyé avec succès !");
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error("Failed to submit comment:", error);
      alert("Échec de l'envoi du commentaire. Veuillez réessayer.");
    }
  }

  async function handleDeleteComment(commentId) {
    try {
      // Make an API call to delete the comment
      await axios.delete(`/comments/${commentId}`);

      // Update the comments state by removing the deleted comment
      setComments(comments.filter((comment) => comment._id !== commentId));

      // Display a success message to the user
      alert("Commentaire supprimé avec succès !");
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error("Failed to delete comment:", error);
      alert("Impossible de supprimer le commentaire. Veuillez réessayer.");
    }
  }

  async function handleEditComment(commentId) {
    try {
      // Prompt the user to enter the updated comment text
      const updatedCommentText = prompt(
        "Saisissez le commentaire mis à jour :"
      );
      // Check if the user entered a comment text
      if (updatedCommentText) {
        // Make an API call to update the comment
        await axios.patch(`/comments/${commentId}`, {
          text: updatedCommentText,
          targetId: id,
        });

        setRefetsh(!refetsh);

        // Display a success message to the user
        alert("Commentaire envoyé avec succès !");
      } else {
        // Display a message indicating that the comment text cannot be empty
        alert(
          "Le texte du commentaire ne peut pas être vide. Veuillez réessayer."
        );
      }
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error("Failed to submit comment:", error);
      alert("Échec de l'envoi du commentaire. Veuillez réessayer.");
    }
  }

  const handleBack = () => {
    // Use the window.history object to go back to the previous path
    window.history.back();
  };

  if (!property) return "";

  return (
    <div
      className={`mt-36 bg-white rounded-xl mx-auto px-4 max-w-screen-xl md:px-8 py-6 ring ${
        property.status ? "ring-green-500" : "ring-gray-500"
      }`}
    >
      {decodedToken?.role !== "Admin" && (
        <button onClick={handleBack}>
          <strong className="rounded border border-primary bg-primary hover:bg-primaryH px-3 py-1.5 text-[14px] font-medium text-white">
            Retour
          </strong>
        </button>
      )}
      {decodedToken?.role === "Admin" && (
        <div className="flex justify-end space-x-3  ">
          <button
            onClick={handleToggleStatus}
            className="rounded border border-primary bg-primary hover:bg-primaryH px-3 py-1.5 text-[14px] font-medium text-white"
          >
            {property.status ? "Désactiver" : "Activer"}
          </button>
          <button
            onClick={handleDeleteProperty}
            className="rounded border border-red-500 bg-red-500 hover:bg-red-600 px-3 py-1.5 text-[14px] font-medium text-white"
          >
            Supprimer
          </button>
        </div>
      )}

      {decodedToken?.id === property.creator._id && (
        <div className="flex justify-end space-x-3  ">
          <button
            onClick={handleDeleteProperty}
            className="rounded border border-red-500 bg-red-500 hover:bg-red-600 px-3 py-1.5 text-[14px] font-medium text-white"
          >
            Supprimer
          </button>
        </div>
      )}

      <h3 className=" mt-2 text-lg font-medium sm:text-xl">
        <div className="hover:underline text-gray-700">{property.title}</div>
      </h3>

      <AddressLink>{property.location}</AddressLink>

      <PropertyGallery property={property} />

      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="text-lg font-medium sm:text-xl text-gray-600">
              Description
            </h2>
            <p className="mt-1 text-sm text-gray-700">{property.description}</p>
          </div>
          <div className="my-4">
            <h2 className="text-lg font-medium sm:text-xl text-gray-600">
              Categorie
            </h2>
            <p className="mt-1 text-sm text-gray-600">{property.category}</p>
          </div>
          <div className="my-4">
            <h2 className="text-lg font-medium sm:text-xl text-gray-600">
              Type de contrat
            </h2>
            <p className="mt-1 text-sm text-gray-700">
              {property.contractType}
            </p>
          </div>
        </div>
        <div className="mt-4 md:mt-16">
          <div className="bg-white shadow-2xl p-2 rounded-2xl text-center ">
            <p className="text-lg font-medium sm:text-xl text-gray-600">Prix</p>
            <p className="mt-1 text-md  text-primary font-medium ">
              {property.price} DA / Mois
            </p>
          </div>
        </div>
      </div>
      <p className=" font-medium mt-3 text-gray-700 underline ">
        Commentaires:
      </p>
      <ul className="mt-4 space-y-2">
        {comments?.length > 0 ? (
          <li>
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="block h-full rounded-lg border border-blue-400 p-3 hover:border-blue-300 mt-2 relative"
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
                Aucun commentaire pour l'instant.
              </strong>
            </div>
          </li>
        )}
      </ul>

      {decodedToken && decodedToken.role !== "Admin" && (
        <>
          <textarea
            rows={3}
            placeholder="Écrivez votre commentaire..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="block h-full rounded-lg border border-blue-400 p-3 hover:border-blue-300 mt-3"
          ></textarea>
          <button onClick={handleCommentSubmit} className="mt-4">
            <strong className="rounded border border-primary bg-primary hover:bg-primaryH px-3 py-1.5 text-[14px] font-medium text-white">
              Commenter
            </strong>
          </button>
        </>
      )}
    </div>
  );
}

export default PropertyPage;
