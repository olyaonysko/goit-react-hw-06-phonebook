import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './contacts/contacts-reducer';
import logger from 'redux-logger';

const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
  reducer: {
    contacts: rootReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware,
});

export default store;
