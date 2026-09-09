import React from 'react';
import { timeAgo, initials } from '../../utils/helpers.js';
import Reactions from './Reactions.jsx';
import Comments from './Comments.jsx';

// Ported from the post rendering loop in community/feed.php
export default function PostCard({ post, currentUserId, isAdmin, onDelete, onToggleReaction, onAddComment }) {
  const canDelete = currentUserId === post.user_id || isAdmin;
  return (
    <div className="post-card" id={`post-${post.id}`}>
      <div className="post-header">
        <span className="post-avatar">{initials(post.display_name)}</span>
        <div>
          <b>{post.display_name}</b>
          {(post.role === 'admin' || post.role === 'super_admin') && <span className="role-pill admin" style={{ marginLeft: 6 }}>Admin</span>}
          <div className="post-meta">{timeAgo(post.created_at)}</div>
        </div>
      </div>
      {post.content && <div className="post-body">{post.content}</div>}
      {post.image_url && <img className="post-image" src={post.image_url} alt="" />}

      <div className="post-actions">
        <Reactions count={post.reaction_count} reacted={post.reacted} onToggle={() => onToggleReaction(post.id)} />
        <span>💬 {(post.comments || []).length} comments</span>
        {canDelete && (
          <button onClick={() => { if (confirm('Delete this post?')) onDelete(post.id); }}>🗑️ Delete</button>
        )}
      </div>

      <Comments
        comments={post.comments || []}
        isLoggedIn={!!currentUserId}
        onAddComment={(content) => onAddComment(post.id, content)}
      />
    </div>
  );
}
