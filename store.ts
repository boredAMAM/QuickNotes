import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './features/notes/notesSlice';

const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;