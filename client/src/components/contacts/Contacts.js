import React, { Fragment, useContext } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts } = contactContext;
  return (
    <Fragment>
      {contacts.map((contact) => (
        // <h3>{contact.name}</h3>
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </Fragment>
  );
};

export default Contacts;
