import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCommunity } from '../hooks/useCommunity.js';
import { communityService } from '../services/communityService.js';
import PostComposer from '../components/community/PostComposer.jsx';
import PostCard from '../components/community/PostCard.jsx';
import { useAuth } from '../hooks/useAuth.js';
import Loader from '../components/common/Loader.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

// Ported from community/feed.php
export default function Community() {
  const { user, isLoggedIn, isAdmin } = useAuth();
  const { posts, loading, reload } = useCommunity();
  const [posting, setPosting] = useState(false);

  const handlePost = async (formData) => {
    setPosting(true);
    try { await communityService.createPost(formData); reload(); } finally { setPosting(false); }
  };
  const handleDelete = async (id) => { await communityService.deletePost(id); reload(); };
  const handleVote = async (id, direction) => { await communityService.vote(id, direction); reload(); };
  const handleToggleBookmark = async (id) => { await communityService.toggleBookmark(id); reload(); };
  const handleAddComment = async (postId, content) => { await communityService.addComment(postId, content); reload(); };

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Community</div>
        {isLoggedIn && (
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/community/groups" className="btn btn-sm btn-secondary">Groups</Link>
            <Link to="/community/messages" className="btn btn-sm btn-secondary">Messages</Link>
          </div>
        )}
      </div>
      {!isLoggedIn && (
        <div className="card">
          <p style={{ margin: 0 }}>
            <Link to="/login">Log in</Link> or <Link to="/register">create an account</Link> to post, comment, and message other members.
          </p>
        </div>
      )}
      {isLoggedIn && <PostComposer onSubmit={handlePost} disabled={posting} />}
      {loading ? <Loader /> : posts.length === 0 ? (
        <EmptyState emoji="🗣️">No posts yet — be the first to share something!</EmptyState>
      ) : (
        posts.map((p) => (
          <PostCard
            key={p.id}
            post={p}
            currentUserId={user?.id}
            isAdmin={isAdmin}
            onDelete={handleDelete}
            onVote={handleVote}
            onToggleBookmark={handleToggleBookmark}
            onAddComment={handleAddComment}
          />
        ))
      )}
    </>
  );
}
