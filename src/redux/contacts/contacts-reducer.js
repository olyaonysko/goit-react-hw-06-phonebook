import { createReducer, combineReducers } from '@reduxjs/toolkit';
import {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  changeFilter,
} from './contacts-action';

const contactsReducer = createReducer([], {
  [fetchContactsSuccess]: (_, { payload }) => payload,
  [addContactSuccess]: (state, { payload }) => [...state, payload],
  [deleteContactSuccess]: (state, { payload }) =>
    state.filter(contact => {
      return contact.id !== payload;
    }),
});

const isLoading = createReducer(false, {
  [fetchContactsRequest]: () => true,
  [fetchContactsSuccess]: () => false,
  [fetchContactsError]: () => false,

  [addContactRequest]: () => true,
  [addContactSuccess]: () => false,
  [addContactError]: () => false,

  [deleteContactRequest]: () => true,
  [deleteContactSuccess]: () => false,
  [deleteContactError]: () => false,
});

const filterReducer = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

export default combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
  isLoading,
});

// import { combineReducers, createReducer } from '@reduxjs/toolkit';
// import { addContacts, deleteContacts, changeFilter } from './contacts-action';
// import {
//   fetchContacts,
//   fetchAddContact,
//   fetchDeleteContact,
// } from './contacts-operation';

// // const contactsReducer = createReducer([], {
// //   [addContacts]: (state, { payload }) => [...state, payload],
// [deleteContacts]: (state, { payload }) =>
//   state.filter(contact => {
//     return contact.id !== payload;
//   }),
// // });

// const contactsReducer = createReducer([], {
//   [fetchContacts.fulfilled]: (_, action) => action.payload,
//   [fetchAddContact.fulfilled]: (state, { payload }) => [...state, payload],
//   [fetchDeleteContact.fulfilled]: (state, { payload }) =>
//     state.filter(contact => {
//       return contact.id !== payload;
//     }),
// });

// // const isLoading = createReducer(false, {
// //   [fetchContacts.pending]: () => true,
// //   [fetchContacts.fulfilled]: () => false,
// //   [fetchContacts.rejected]: () => false,
// // });
