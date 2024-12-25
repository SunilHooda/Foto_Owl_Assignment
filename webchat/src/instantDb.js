import { i, init } from "@instantdb/react";

const APP_ID = process.env.REACT_APP_PUBLIC_APP_ID; // Replace with your actual AppId

// Define schema
const schema = i.schema({
  entities: {
    users: i.entity({
      name: i.string(),
      email: i.string(),
      number: i.string(),
      password: i.string(),
    }),
    contacts: i.entity({
      userId: i.string(), // Link to the user who owns the contact
      name: i.string(),
      number: i.string(),
    }),
    messages: i.entity({
      senderId: i.string(), // Sender's user ID
      receiverId: i.string(), // Receiver's user ID (can be empty for unregistered users)
      receiverNumber: i.string(), // Receiver's phone number
      text: i.string(),
      timestamp: i.number(),
    }),
  },
});

export const db = init({ appId: APP_ID, schema });
