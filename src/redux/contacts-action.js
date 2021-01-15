import shortid from 'shortid';
import { createAction } from '@reduxjs/toolkit';

export const deleteContacts = createAction('contacts/delete');
export const changeFilter = createAction('contacts/changeFilter');
export const addContacts = createAction('contacts/add', (name, number) => ({
  payload: {
    id: shortid.generate(),
    name,
    number,
  },
}));
