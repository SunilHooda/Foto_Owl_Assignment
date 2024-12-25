// import React, { useState, useContext } from "react";
// import { db } from "../instantDb";
// import { AppContext } from "../context/AppContext";
// import { saveMessageOffline } from "../hooks/useIndexedDB";

// const MessageInput = ({ contact }) => {
//   const [message, setMessage] = useState("");
//   const { state, dispatch } = useContext(AppContext);

//   const handleSendMessage = async () => {
//     if (!message.trim()) return;

//     const newMessage = {
//       id: crypto.randomUUID(),
//       senderId: state.user.id,
//       receiverId: contact.userId || null,
//       receiverNumber: contact.number,
//       text: message,
//       timestamp: Date.now(),
//     };

//     try {
//       await db.tx.messages.add(newMessage); // Save to InstantDB
//       await saveMessageOffline(newMessage); // Save to IndexedDB

//       dispatch({
//         type: "ADD_MESSAGE",
//         contactId: contact.id,
//         payload: newMessage,
//       });
//       setMessage("");
//     } catch (error) {
//       alert("Error sending message: " + error.message);
//     }
//   };

//   return (
//     <div className="message-input">
//       <input
//         type="text"
//         placeholder="Type a message..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={handleSendMessage}>Send</button>
//     </div>
//   );
// };

// export default MessageInput;

import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { saveMessageOffline } from "../hooks/useIndexedDB"; // Import IndexedDB utility for saving messages

const MessageInput = ({ contact }) => {
  const [message, setMessage] = useState("");
  const { state, dispatch } = useContext(AppContext);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = {
      id: crypto.randomUUID(),
      senderId: state.user.id,
      receiverId: contact.userId || null,
      receiverNumber: contact.number,
      text: message,
      timestamp: Date.now(),
    };

    try {
      // Save the message to IndexedDB
      await saveMessageOffline(newMessage);

      // Dispatch action to update the global state
      dispatch({
        type: "ADD_MESSAGE",
        contactId: contact.id,
        payload: newMessage,
      });

      // Reset the message input field
      setMessage("");
    } catch (error) {
      alert("Error sending message: " + error.message);
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
