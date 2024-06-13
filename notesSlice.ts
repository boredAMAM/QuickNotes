import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Note = {
  id: string;
  text: string;
};

type NotesState = {
  notes: Note[];
  error: string | null; // Added to keep track of errors
};

const initialState: NotesState = {
  notes: [],
  error: null, // Initially, there is no error.
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      if (!action.payload.id || !action.payload.text) {
        state.error = 'Invalid note data'; // Error handled here
        return;
      }
      state.notes.push(action.payload);
      state.error = null; // Resetting error after successful operation
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      if (!action.payload.id || !action.payload.text) {
        state.error = 'Invalid note data'; // Error handled here
        return;
      }
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
        state.error = null; // Resetting error after successful operation
      } else {
        state.error = `Note with ID ${action.payload.id} not found`; // Error handled here
      }
    },
    removeNote: (state, action: PayloadAction<string>) => {
      const index = state.notes.findIndex(note => note.id === action.payload);
      if (index === -1) {
        state.error = `Note with ID ${action.payload} not found`; // Error handled here
        return;
      }
      state.notes = state.notes.filter(note => note.id !== action.payload);
      state.error = null; // Resetting error after successful operation
    },
    clearError: (state) => {
      state.error = null; // Add an action to clear errors
    },
  },
});

export const { addNote, updateNote, remove

Note, clearError } = notesSlice.actions;

export default notesSlice.reducer;