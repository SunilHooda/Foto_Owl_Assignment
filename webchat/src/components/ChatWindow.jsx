// import React, { useContext } from "react";
// import { db } from "../instantDb";
// import { AppContext } from "../context/AppContext";

// const ChatWindow = ({ contact }) => {
//   const { state } = useContext(AppContext);

//   // Real-time subscription to messages
//   const { isLoading, error, data } = db.useQuery({
//     messages: {
//       where: {
//         $or: [
//           { senderId: state.user.id, receiverNumber: contact.number },
//           { receiverId: state.user.id, senderId: contact.userId || null },
//         ],
//       },
//     },
//   });

//   if (isLoading) {
//     return <div className="chat-window">Loading messages...</div>;
//   }

//   if (error) {
//     return <div className="chat-window error">Error : {error.message}</div>;
//   }

//   const messages = data.messages || [];

//   return (
//     <div className="chat-window">
//       {messages.map((msg) => (
//         <div
//           key={msg.id}
//           className={`message ${
//             msg.senderId === state.user.id
//               ? "message-outgoing"
//               : "message-incoming"
//           }`}
//         >
//           <div className="message-text">{msg.text}</div>
//           <span className="message-timestamp">
//             {new Date(msg.timestamp).toLocaleTimeString()}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ChatWindow;

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { getMessagesOffline } from "../hooks/useIndexedDB"; // Import your IndexedDB utility

const ChatWindow = ({ contact }) => {
  const { state } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Fetch messages from IndexedDB
        const offlineMessages = await getMessagesOffline(
          contact.id,
          state.user.id
        );
        setMessages(offlineMessages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    };

    if (state.user && contact) {
      fetchMessages();
    }
  }, [state.user, contact]);

  if (loading) {
    return <div className="chat-window">Loading messages...</div>;
  }

  return (
    <div className="chat-window">
      {messages.length === 0 ? (
        <div>No messages</div>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.senderId === state.user.id
                ? "message-outgoing"
                : "message-incoming"
            }`}
          >
            <div className="message-text">{msg.text}</div>
            <span className="message-timestamp">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatWindow;
