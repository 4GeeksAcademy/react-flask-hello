const createMessage = (messageData) => {
  fetch("/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Dispatch a Flux action to add the new message
      dispatcher.dispatch({
        type: "ADD_MESSAGE",
        message: data,
      });
    })
    .catch((error) => {
      console.error("Error creating message:", error);
    });
};

export default createMessage;
