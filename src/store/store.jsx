// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';

import UserReducer from './reducer';

const store = configureStore({
  reducer: {
    users: UserReducer,
  },
});

export default store;