import { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

const useReviewManagement = () => {
  const { store, actions } = useContext(Context);
  const [editContentId, setEditContentId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    actions.getReviews();
    if (store.favorites && store.favorites.length >= 1) {
      actions.getFavoriteReview()
      // console.log("Success fetch for CardsReview");
    }
  }, []);

  const handleEditContent = (content) => {
    setEditContent(content);
  };

  const handleUpdate = (id) => {
    const reviewToUpdate = store.reviews.find((review) => review.id === id);
    if (reviewToUpdate) {
      setEditTitle(reviewToUpdate.title);
      setEditContent(reviewToUpdate.comment_text);
      setEditContentId(id);
    }
  };

  const handleSave = (id) => {
    const reviewToUpdate = store.reviews.find((review) => review.id === id);
    if (reviewToUpdate) {
      reviewToUpdate.title = editTitle;
      reviewToUpdate.comment_text = editContent;
      setEditTitle("");
      setEditContent("");
      setEditContentId(null);
    }
  };

  const handleDelete = (id) => {
    actions.deleteReview(id);
    window.location.reload();
  };

  return {
    editContentId,
    editTitle,
    editContent,
    handleUpdate,
    handleSave,
    handleDelete,
    handleEditContent,
    reviews: store.reviews,
    favorites: store.favorites
  };
};

export default useReviewManagement;