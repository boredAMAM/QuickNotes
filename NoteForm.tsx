import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

interface Note {
  title: string;
  content: string;
}

const AddNoteForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');

    const newNote: Note = {
      title,
      content,
    };

    try {
      dispatch(addNoteAction(newNote));

      await axios.post(`${process.env.REACT_APP_API_URL}/notes`, newNote);

      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Failed to save the note:', error);
      setError('Failed to save the note. Please try again.'); 
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Add Note</button>
      </form>
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </div>
      )}
    </>
  );
};

export default AddNoteForm;