//use reducer hook to have access to state
//and dispatch to our reducer
import React, { useReducer } from 'react';
import uuid from 'uuid';
import contactContext from './ContactContext';
import contactReducer from './ContactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

//create initial state
const ContactState = props => {
  const initialState = {
    //contacts array
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jill@gmail.com',
        phone: '111-111-1111',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Sara Watson',
        email: 'sara@gmail.com',
        phone: '222-222-2222',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Harry White',
        email: 'harry@gmail.com',
        phone: '333-333-3333',
        type: 'professional'
      }
    ],
    current: null
  };

  //pull out state and dispatch from our reducer by using useReducer hook
  //state allows to access anything in state
  //dispatch allows us to dispatch objects to the reducer
  //pass in contactReducer and intitalState
  const [state, dispatch] = useReducer(contactReducer, initialState);
  // Add Contact

  const addContact = contact => {
    //generate random id
    contact.id = uuid.v4();
    //dispatch to reducer
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Delete Contact
  const deleteContact = id => {
    //dispatch to reducer
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  //Set Current Contact
  const setCurrent = contact => {
    //dispatch to reducer
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //Clear Current Contact
  const clearCurrent = () => {
    //dispatch to reducer
    dispatch({ type: CLEAR_CURRENT });
  };
  //Update Contact
  const updateContact = contact => {
    //dispatch to reducer
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };
  //Filter Contacts

  //Clear Filter

  //return our provider we wrap entire app with this context
  return (
    //initialized state provides data to pass through data tree
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
