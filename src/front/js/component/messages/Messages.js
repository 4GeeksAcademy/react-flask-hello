import React, { useState, useEffect } from "react";
import axios from "axios";

const Messages = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSentMessages = async () => {
      try {
        const response = await axios.get(`/users/${userId}/sent_messages`);
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSentMessages();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (messages.length === 0) {
    return <div>No messages found</div>;
  }

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          <p>{message.text}</p>
          <p>{message.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Messages;
