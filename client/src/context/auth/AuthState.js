//use reducer hook to have access to state
//and dispatch to our reducer
import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

//create initial state
//token is stored in browser local storage
const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  //pull out state and dispatch from our reducer by using useReducer hook
  //state allows to access anything in state
  //dispatch allows us to dispatch objects to the reducer
  //pass in contactReducer and intitalState
  const [state, dispatch] = useReducer(authReducer, initialState);

  //Load User

  //Register User

  //Login User

  //Logout User

  //Clear Errors

  return (
    //initialized state provides data to pass through data tree
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
