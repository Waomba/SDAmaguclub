import React, { useState } from 'react';

// Ported from the post-creation form in community/feed.php
export default function PostComposer({ onSubmit }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('image', image);
    onSubmit(formData);
    setContent('');
    setImage(null);
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share an update, prayer request, or encouragement…"
        />
        <div className="form-row" style={{ alignItems: 'center' }}>
          <input type="file" accept="image/*" style={{ flex: 1 }} onChange={(e) => setImage(e.target.files[0] || null)} />
          <button type="submit" className="btn">Post</button>
        </div>
      </form>
    </div>
  );
}
