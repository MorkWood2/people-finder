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

export default (state, action) => {
  //look at the type
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      //token is in the payload action.payload.token
      //take token add to local storage
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        //this is token put it in state
        ...action.payload,
        //change from null to true
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      //remove token from storage
      localStorage.removeItem('token');
      //reset everything
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        //in authState if we fail err is msg
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};
