import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from './store/types';
import { deleteNote, editNote } from './store/actions';

type NoteItemProps = {
  id: number;
  title: string;
  content: string;
};

const NoteItem: React.FC<NoteItemProps> = ({ id, title, content }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteNote(id));
  };

  const handleEdit = () => {
    const newTitle = prompt('New Title', title);
    const newContent = prompt('New Content', content);
    if (newTitle && newContent) {
      dispatch(editNote({
        id,
        title: newTitle,
        content: newContent,
      }));
    }
  };
  
  return (
    <li>
      <h3>{title}</h3>
      <p>{content}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Entfernen</button>
    </li>
  );
};

const NotesList: React.FC = () => {
  const notes = useSelector((state: AppState) => state.notes);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = useMemo(() => {
    return notes.filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      note.content.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [notes, searchTerm]);

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search notes" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <ul>
        {filteredNotes.map(note => (
          <NoteItem key={note.id} {...note} />
        ))}
      </ul>
    </div>
  );
};

export default NotesList;