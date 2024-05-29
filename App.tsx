import React, { useState } from 'react';
import NoteForm from './NoteForm';
import NoteList from './NoteList';

interface Note {
  id: string;
  title: string;
  body: string;
}

const MainComponent: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null); // To hold the note being edited.

  const addNote = (note: Note) => {
    if (editingNote) {
      // If we are editing an existing note, update it
      setNotes((prevNotes) =>
        prevNotes.map((prevNote) =>
          prevNote.id === note.id ? note : prevNote
        )
      );
      setEditingNote(null); // Reset editing note after update
    } else {
      // Otherwise, add a new note
      setNotes((prevNotes) => [...prevNotes, note]);
    }
  };

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
  };

  const startEditingNote = (id: string) => {
    const noteToEdit = notes.find(note => note.id === id);
    setEditingNote(noteToEdit ?? null);
  };

  return (
    <div>
      <nav>
        <h1>Note Taking App</h1>
      </nav>
      <NoteForm onAddNote={addNote} editingNote={editingNote} />
      <NoteList notes={notes} onDeleteNote={deleteNote} onEditNote={startEditingNote} />
    </div>
  );
};

export default MainComponent;