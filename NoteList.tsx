import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

const NotesList: React.FC = () => {
  const notes = useSelector((state: AppState) => state.notes);

  return (
    <ul>
      {notes.map(note => (
        <NoteItem key={note.id} {...note} />
      ))}
    </ul>
  );
};

export default Notes+List;