import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AppProvider, AppContext } from "./context/AppContext";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import ChatWindow from "./components/ChatWindow";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import MessageInput from "./components/MessageInput";
import "./App.css";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { state } = useContext(AppContext);
  return state.user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <div className="chat-container">
                    <div className="contact-panel">
                      <AddContact />
                      <ContactList />
                    </div>
                    <div className="chat-panel">
                      <ChatWindow />
                      <MessageInput />
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Redirect to login by default */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
