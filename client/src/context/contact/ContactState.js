//use reducer hook to have access to state
//and dispatch to our reducer
//reducer manipulates state
import React, { useReducer } from 'react';
import axios from 'axios';
import contactContext from './ContactContext';
import contactReducer from './ContactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types';

//create initial state
const ContactState = props => {
  const initialState = {
    //contacts array
    contacts: [],
    current: null,
    filtered: null,
    error: null
  };

  //pull out state and dispatch from our reducer by using useReducer hook
  //state allows to access anything in state
  //dispatch allows us to dispatch objects to the reducer
  //pass in contactReducer and intitalState
  const [state, dispatch] = useReducer(contactReducer, initialState);
  //action payloads
  // Add Contact

  const addContact = async contact => {
    //create header for sending data
    const config = {
      headers: {
        'Contact-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/contacts', contact, config);
      //dispatch to reducer
      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
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
  const filterContacts = text => {
    //dispatch to reducer
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  //Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  //return our provider we wrap entire app with this context
  return (
    //initialized state provides data to pass through data tree
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
