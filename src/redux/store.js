import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import roversReducer from './rovers/reducer';

const reducer = {
  rovers: roversReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
