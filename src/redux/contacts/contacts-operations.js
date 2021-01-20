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
} from './contacts-action';

import {
  fetchContacts,
  fetchAddContact,
  fetchDeleteContact,
} from '../../services/contactsApi';

export const getContacts = () => async dispatch => {
  dispatch(fetchContactsRequest());

  try {
    const { data } = await fetchContacts();
    dispatch(fetchContactsSuccess(data));
  } catch (error) {
    dispatch(fetchContactsError(error));
  }
};

export const addContact = (name, number) => async dispatch => {
  const contact = {
    name,
    number,
  };

  dispatch(addContactRequest());

  try {
    const { data } = await fetchAddContact(contact);
    dispatch(addContactSuccess(data));
  } catch (error) {
    dispatch(addContactError(error));
  }
};

export const deleteContact = id => async dispatch => {
  dispatch(deleteContactRequest());

  try {
    await fetchDeleteContact(id);
    dispatch(deleteContactSuccess(id));
  } catch (error) {
    dispatch(deleteContactError(error));
  }
};

// import { createAsyncThunk } from '@reduxjs/toolkit';
// import * as contactsApi from '../services/contactsApi';

// export const fetchContacts = createAsyncThunk(
//   'books/fetchBooks',
//   async (_, { rejectWithValue }) => {
//     try {
//       const contacts = await contactsApi.fetchContacts();
//       return contacts;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   },
// );

// export const fetchAddContact = createAsyncThunk(
//   'books/fetchBooks',
//   async (_, { rejectWithValue }) => {
//     try {
//       const contacts = await contactsApi.fetchAddContact();
//       return contacts;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   },
// );

// export const fetchDeleteContact = createAsyncThunk(
//   'books/fetchBooks',
//   async (_, { rejectWithValue }) => {
//     try {
//       const contacts = await contactsApi.fetchDeleteContact();
//       return contacts;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   },
// );
