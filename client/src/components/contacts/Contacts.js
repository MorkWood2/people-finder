import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/ContactContext';

const Contacts = () => {
  //initialize context
  //access to all state associated context
  const contactContext = useContext(ContactContext);

  //pull out contacts from contractContext
  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        {/* {contacts array and loop through. checking to see if anything in filtered if there is not null means something is in it then we map through that and show contact item} */}
        {filtered !== null
          ? filtered.map(contact => (
              <CSSTransition key={contact._id} timeout={500} classNames='item'>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map(contact => (
              <CSSTransition key={contact._id} timeout={500} classNames='item'>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
