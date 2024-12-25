// import React, { useContext, useEffect } from "react";
// import { db } from "../instantDb";
// import { AppContext } from "../context/AppContext";
// import { getContactsOffline } from "../hooks/useIndexedDB";

// const ContactList = ({ onSelectContact }) => {
//   const { state, dispatch } = useContext(AppContext);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const { data } = db.useQuery({
//           contacts: { where: { userId: state.user.id } },
//         });

//         // Save contacts offline
//         data.contacts.forEach(async (contact) => {
//           await getContactsOffline(contact);
//         });

//         dispatch({ type: "SET_CONTACTS", payload: data.contacts });
//       } catch {
//         const offlineContacts = await getContactsOffline(state.user.id);
//         dispatch({ type: "SET_CONTACTS", payload: offlineContacts });
//       }
//     };

//     if (state.user) fetchContacts();
//   }, [state.user, dispatch]);

//   if (!state.contacts.length) {
//     return <div className="contact-list">No contacts found</div>;
//   }

//   return (
//     <div className="contact-list">
//       {state.contacts.map((contact) => (
//         <div key={contact.id} onClick={() => onSelectContact(contact.id)}>
//           {contact.name} ({contact.number})
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ContactList;

import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { getContactsOffline } from "../hooks/useIndexedDB"; // Import IndexedDB utility for contacts

const ContactList = ({ onSelectContact }) => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Get contacts from IndexedDB
        const offlineContacts = await getContactsOffline(state.user.id);

        // Dispatch contacts to the global state
        dispatch({ type: "SET_CONTACTS", payload: offlineContacts });
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    if (state.user) {
      fetchContacts();
    }
  }, [state.user, dispatch]);

  if (!state.contacts || state.contacts.length === 0) {
    return <div className="contact-list">No contacts found</div>;
  }

  return (
    <div className="contact-list">
      {state.contacts.map((contact) => (
        <div key={contact.id} onClick={() => onSelectContact(contact.id)}>
          {contact.name} ({contact.number})
        </div>
      ))}
    </div>
  );
};

export default ContactList;
