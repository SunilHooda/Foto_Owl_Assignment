// import React, { useState, useContext } from "react";
// import { db } from "../instantDb";
// import { AppContext } from "../context/AppContext";
// import { saveContactOffline } from "../hooks/useIndexedDB";

// const AddContact = () => {
//   const { state, dispatch } = useContext(AppContext);
//   const [contactData, setContactData] = useState({ name: "", number: "" });

//   const handleAddContact = async () => {
//     const { name, number } = contactData;

//     // Validation: Check if fields are filled
//     if (!name || !number) {
//       alert("Both fields are required!");
//       return;
//     }

//     // Validation: Prevent duplicate contacts
//     const existingContact = state.contacts.find((c) => c.number === number);
//     if (existingContact) {
//       alert("This contact already exists!");
//       return;
//     }

//     const newContact = {
//       id: crypto.randomUUID(),
//       userId: state.user.id,
//       name,
//       number,
//     };

//     try {
//       // Save to InstantDB
//       await db.tx.contacts.add(newContact);

//       // Save to IndexedDB
//       await saveContactOffline(newContact);

//       // Update global state
//       dispatch({ type: "ADD_CONTACT", payload: newContact });

//       // Reset form and show success message
//       setContactData({ name: "", number: "" });
//       alert("Contact added successfully!");
//     } catch (error) {
//       alert("Error adding contact: " + error.message);
//     }
//   };

//   return (
//     <div className="add-contact">
//       <input
//         name="name"
//         className="add-contact-input"
//         placeholder="Contact Name"
//         value={contactData.name}
//         onChange={(e) =>
//           setContactData({ ...contactData, name: e.target.value })
//         }
//       />
//       <input
//         name="number"
//         className="add-contact-input"
//         placeholder="Contact Number"
//         value={contactData.number}
//         onChange={(e) =>
//           setContactData({ ...contactData, number: e.target.value })
//         }
//       />
//       <button className="add-contact-button" onClick={handleAddContact}>
//         Add Contact
//       </button>
//     </div>
//   );
// };

// export default AddContact;

import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { saveContactOffline } from "../hooks/useIndexedDB"; // Import the IndexedDB utility

const AddContact = () => {
  const { state, dispatch } = useContext(AppContext);
  const [contactData, setContactData] = useState({ name: "", number: "" });

  const handleAddContact = async () => {
    const { name, number } = contactData;

    // Validation: Check if fields are filled
    if (!name || !number) {
      alert("Both fields are required!");
      return;
    }

    // Validation: Prevent duplicate contacts
    const existingContact = state.contacts.find((c) => c.number === number);
    if (existingContact) {
      alert("This contact already exists!");
      return;
    }

    const newContact = {
      id: crypto.randomUUID(),
      userId: state.user.id,
      name,
      number,
    };

    try {
      // Save to IndexedDB
      await saveContactOffline(newContact); // Save the new contact to IndexedDB

      // Update global state
      dispatch({ type: "ADD_CONTACT", payload: newContact });

      // Reset form and show success message
      setContactData({ name: "", number: "" });
      alert("Contact added successfully!");
    } catch (error) {
      alert("Error adding contact: " + error.message);
    }
  };

  return (
    <div className="add-contact">
      <input
        name="name"
        className="add-contact-input"
        placeholder="Contact Name"
        value={contactData.name}
        onChange={(e) =>
          setContactData({ ...contactData, name: e.target.value })
        }
      />
      <input
        name="number"
        className="add-contact-input"
        placeholder="Contact Number"
        value={contactData.number}
        onChange={(e) =>
          setContactData({ ...contactData, number: e.target.value })
        }
      />
      <button className="add-contact-button" onClick={handleAddContact}>
        Add Contact
      </button>
    </div>
  );
};

export default AddContact;
