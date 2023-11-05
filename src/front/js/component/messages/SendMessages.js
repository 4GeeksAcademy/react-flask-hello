import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";

function SendMessages() {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="container">
      <form onSubmit={(e) => actions.handleSubmitMessage(e, navigate)}>
        <input
          type="text"
          name={"message"}
          value={store.message.message}
          onChange={actions.handleChangeMessage}
          placeholder="Message"
          required
        />
        <input
          type="number"
          name="user_from_id"
          value={store.message.user_from_id}
          onChange={actions.handleChangeMessage}
          placeholder="User From ID"
          required
        />
        <input
          type="number"
          name="user_to_id"
          value={store.message.user_to_id}
          onChange={actions.handleChangeMessage}
          placeholder="User To ID"
          required
        />
        <button type="submit">Create Message</button>
      </form>
      <p>{store.message.message}</p>
      <p>{store.newUser.id}</p>
      <h6>{store.message.user_to_id}</h6>
    </div>
  );
}

export default SendMessages;
