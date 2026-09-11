import React from 'react';
import { Link } from 'react-router-dom';
import { useCommunity } from '../../hooks/useCommunity.js';
import { communityService } from '../../services/communityService.js';
import PostCard from '../../components/community/PostCard.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/community/Posts.php
export default function Posts() {
  const { user } = useAuth();
  const { posts, loading, reload } = useCommunity();
  const handleDelete = async (id) => { await communityService.deletePost(id); reload(); };
  const handleVote = async (id, direction) => { await communityService.vote(id, direction); reload(); };
  const handleToggleBookmark = async (id) => { await communityService.toggleBookmark(id); reload(); };
  const handleAddComment = async (postId, content) => { await communityService.addComment(postId, content); reload(); };

  if (loading) return <Loader />;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>All Posts</div>
        <Link to="/admin/community" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      {posts.map((p) => (
        <PostCard key={p.id} post={p} currentUserId={user?.id} isAdmin onDelete={handleDelete} onVote={handleVote} onToggleBookmark={handleToggleBookmark} onAddComment={handleAddComment} />
      ))}
    </>
  );
}
