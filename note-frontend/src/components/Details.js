import React, { useState } from 'react';
import axios from 'axios';

function Details({ item, type, onClose, onUpdate, onDelete }) {
  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content || '');
  const [dueDate, setDueDate] = useState(item.due_date || '');
  const [color, setColor] = useState(item.color);

  const handleUpdate = async () => {
    try {
      const updatedItem = { ...item, title, color };
      if (type === 'note') updatedItem.content = content;
      if (type === 'task') updatedItem.due_date = dueDate;

      await axios.put(`http://localhost:8000/api/${type}s/${item.id}/`, updatedItem);
      onUpdate(updatedItem);
      onClose();
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/${type}s/${item.id}/`);
      onDelete(item.id);
      onClose();
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  return (
    <div className="detail-view">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      {type === 'note' && (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
      )}
      {type === 'task' && (
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      )}
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default Details;