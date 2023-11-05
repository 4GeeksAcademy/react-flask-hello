import { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

const useOfferManagement = () => {
    const { store, actions } = useContext(Context);
    const [editContentId, setEditContentId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

    useEffect(() => {
        actions.getAllOffers();
        if (store.favorites && store.favorites.length >= 1) {
            actions.getFavoriteoffer()
            // console.log("Success fetch for Cardsofers");
        }
        // console.log("Success fetch for CardsOffer");
    }, []);

    const handleEditContent = (content) => {
        setEditContent(content);
    };

    const handleUpdate = (id) => {
        const offerToUpdate = store.offers.find((offer) => offer.id === id);
        if (offerToUpdate) {
            setEditTitle(offerToUpdate.offer_title);
            setEditContent(offerToUpdate.offer_description);
            setEditContentId(id);
        }
    };

    const handleSave = (id) => {
        const offerToUpdate = store.offers.find((offer) => offer.id === id);
        if (offerToUpdate) {
            offerToUpdate.title = editTitle;
            offerToUpdate.comment_text = editContent;
            setEditTitle("");
            setEditContent("");
            setEditContentId(null);
        }
    };

    const handleDelete = (id) => {
        actions.deleteOfferById(id);
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
        offers: store.offers,
        favorites: store.favorites
    };
};

export default useOfferManagement;