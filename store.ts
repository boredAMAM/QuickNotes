import { configureStore } from '@reduxjs/toolkit';
import notesFeatureReducer from './features/notes/notesSlice';

const notesAppStore = configureStore({
  reducer: {
    notes: notesFeatureReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof notesAppStore.getState>;
export type NotesAppDispatch = typeof notesAppStore.dispatch;

export default notesAppStore;