import React, { useState, useEffect } from 'react';
import NoteForm from './NoteForm'; 
import NoteList from './NoteList'; 

interface Note {
  id: string;
  title: string;
  body: string;
}

const MainComponent: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (note: Note) => {
    setNotes([...notes, note]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div>
      <nav>
        <h1>Note Taking App</h1>
      </nav>
      <NoteForm onAddNote={addNote} />
      <NoteList notes={notes} onDeleteNote={deleteNote} />
    </div>
  );
};

export default MainComponent;