import React from 'react';
import { timeAgo, initials } from '../../utils/helpers.js';
import Reactions from './Reactions.jsx';
import Comments from './Comments.jsx';

// Ported from the post rendering loop in community/feed.php.
// Action row redesigned as: [Upvote count] [Downvote count] [Comment count] ... [Share] [Bookmark]
export default function PostCard({ post, currentUserId, isAdmin, onDelete, onVote, onToggleBookmark, onAddComment }) {
  const canDelete = currentUserId === post.user_id || isAdmin;

  const handleShare = () => {
    const url = `${window.location.origin}/community#post-${post.id}`;
    if (navigator.share) {
      navigator.share({ title: 'MAGU SDA CLUB — Community', url });
    } else {
      navigator.clipboard?.writeText(url);
    }
  };

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

      <div className="post-actions-bar">
        <div className="post-actions-left">
          <Reactions upvotes={post.upvotes} downvotes={post.downvotes} myVote={post.my_vote} onVote={(dir) => onVote(post.id, dir)} />
          <button className="comment-btn" onClick={() => document.getElementById(`comment-input-${post.id}`)?.focus()}>
            💬 {(post.comments || []).length}
          </button>
          {canDelete && (
            <button className="comment-btn" onClick={() => { if (confirm('Delete this post?')) onDelete(post.id); }}>🗑️</button>
          )}
        </div>
        <div className="post-actions-right">
          <button className="icon-circle-btn" onClick={handleShare} aria-label="Share">🔗</button>
          <button
            className={`icon-circle-btn ${post.bookmarked ? 'active' : ''}`}
            onClick={() => onToggleBookmark(post.id)}
            aria-label="Bookmark"
          >
            💚 
          </button>
        </div>
      </div>

      <Comments
        comments={post.comments || []}
        isLoggedIn={!!currentUserId}
        inputId={`comment-input-${post.id}`}
        onAddComment={(content) => onAddComment(post.id, content)}
      />
    </div>
  );
}
