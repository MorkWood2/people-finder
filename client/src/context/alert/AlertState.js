//use reducer hook to have access to state
//and dispatch to our reducer
import React, { useReducer } from 'react';
import uuid from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

//create initial state
//token is stored in browser local storage
const AlertState = props => {
  const initialState = [];

  //pull out state and dispatch from our reducer by using useReducer hook
  //state allows to access anything in state
  //dispatch allows us to dispatch objects to the reducer
  //pass in contactReducer and intitalState
  const [state, dispatch] = useReducer(alertReducer, initialState);

  //Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    //generate random id
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    //initialized state provides data to pass through data tree
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
