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

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };

    case UPDATE_CONTACT:
      return {
        ...state,
        //take contacts array for each contact match ids then return action.payload (updated contact) else return contact as is
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };
    case DELETE_CONTACT:
      //return current state filter out contact we want to delete from ui
      //return all contacts not the current id EX: id:1 it will return id:2 && id:3
      return {
        ...state,
        contacts: state.contacts.filter(
          //return contacts that are not payload id
          contact => contact.id !== action.payload
        )
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };

    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case CONTACT_ERROR:
      return {
        ...state,
        //msg
        error: action.payload
      };
    default:
      return state;
  }
};
