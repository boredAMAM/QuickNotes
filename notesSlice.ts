import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Note = {
  id: string;
  text: string;
};

type NotesState = {
  notes: Note[];
};

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadProgressBarAction<Note>) => {
      state.notes.push(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    removeNote: (state, action: PayloadAction<string>) => {
     state.notes = state.notes.filter(note => note.id !== action.payload);
    },
  },
});

export const { addNote, updateNote, removeNote } = notesSlice.actions;

export default notesSlice.reducer;