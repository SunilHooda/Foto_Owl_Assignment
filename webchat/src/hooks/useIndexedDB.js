import { openDB } from "idb";

const dbPromise = openDB("WebChat", 1, {
  upgrade(db) {
    db.createObjectStore("users", { keyPath: "email" });
    db.createObjectStore("contacts", { keyPath: "id" });
    db.createObjectStore("messages", { keyPath: "id" });
  },
});

// User Operations
export const saveUserOffline = async (user) => {
  const db = await dbPromise;
  await db.put("users", user);
};

export const getUserOffline = async (email) => {
  const db = await dbPromise;
  return db.get("users", email);
};

// Contact Operations
export const saveContactOffline = async (contact) => {
  const db = await dbPromise;
  await db.put("contacts", contact);
};

export const getContactsOffline = async (userId) => {
  const db = await dbPromise;
  const contacts = await db.getAll("contacts");
  return contacts.filter((contact) => contact.userId === userId);
};

// Message Operations
export const saveMessageOffline = async (message) => {
  const db = await dbPromise;
  await db.put("messages", message);
};

export const getMessagesOffline = async (contactId, userId) => {
  const db = await dbPromise;
  const messages = await db.getAll("messages");
  return messages.filter(
    (msg) => msg.contactId === contactId && msg.userId === userId
  );
};
