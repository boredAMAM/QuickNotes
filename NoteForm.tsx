import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

interface Note {
  title: string;
  content: string;
}

const AddNoteForm: React.FC = () => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [submissionError, setSubmissionError] = useState('');
  const dispatch = useDispatch();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmissionError('');

    const newNote: Note = {
      title: noteTitle,
      content: noteContent,
    };

    try {
      dispatch(addNoteAction(newNote));

      await axios.post(`${process.env.REACT_APP_API_URL}/notes`, newNote);

      setNoteTitle('');
      setNoteContent('');
    } catch (error) {
      console.error('Failed to save the note:', error);
      setSubmissionError('Failed to save the note. Please try again.'); 
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
        </div>
        <button type="submit">Add Note</button>
      </form>
      {submissionError && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {submissionError}
        </div>
      )}
    </>
  );
};

export default AddNoteForm;