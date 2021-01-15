import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { addContacts, deleteContacts, changeFilter } from './contacts-action';

const contactsReducer = createReducer([], {
  [addContacts]: (state, { payload }) => [...state, payload],
  [deleteContacts]: (state, { payload }) =>
    state.filter(contact => {
      return contact.id !== payload;
    }),
});

const filterReducer = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

export default combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});
