import React, { createContext, useReducer } from "react";

// Initial state
const initialState = {
  user: null, // Logged-in user
  contacts: [], // Contacts list
  messages: {}, // Messages per contact
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return { ...state, user: null, contacts: [], messages: {} };

    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };

    case "ADD_CONTACT":
      return { ...state, contacts: [...state.contacts, action.payload] };

    case "SET_MESSAGES":
      return {
        ...state,
        messages: { ...state.messages, [action.contactId]: action.payload },
      };

    case "ADD_MESSAGE":
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.contactId]: [
            ...(state.messages[action.contactId] || []),
            action.payload,
          ],
        },
      };

    default:
      return state;
  }
};

// Create context
export const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
