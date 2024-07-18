import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Details from './Details';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get('http://localhost:8000/api/notes/');
    setNotes(response.data.reverse());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/notes/', { title, content, color });
      setTitle('');
      setContent('');
      setColor('#ffffff');
      fetchNotes();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const handleNoteUpdate = (updatedNote) => {
    setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
  };

  const handleNoteDelete = (deletedNoteId) => {
    setNotes(notes.filter(note => note.id !== deletedNoteId));
  };

  return (
    <div className="notes-section">
      <h2>Notes</h2>
      <div className="form-section">
        <form onSubmit={handleSubmit}>
          {/* ... (keep existing form fields) ... */}
        </form>
      </div>
      <div className="card-grid">
        {notes.map((note) => (
          <div
            key={note.id}
            className="card note-card"
            style={{ backgroundColor: note.color }}
            onClick={() => handleNoteClick(note)}
          >
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
      {selectedNote && (
        <Details
          item={selectedNote}
          type="note"
          onClose={() => setSelectedNote(null)}
          onUpdate={handleNoteUpdate}
          onDelete={handleNoteDelete}
        />
      )}
    </div>
  );
}

export default Notes;