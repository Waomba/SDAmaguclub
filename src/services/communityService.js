// Ported from community/feed.php, community/chat.php, community/groups.php, community/messages.php
import { api } from './api.js';

export const communityService = {
  posts: () => api.get('/community/posts'),
  createPost: (formData) => api.postForm('/community/posts', formData), // FormData: content, image?
  deletePost: (id) => api.del(`/community/posts/${id}`),
  addComment: (postId, content) => api.post(`/community/posts/${postId}/comments`, { content }),
  toggleReaction: (postId) => api.post(`/community/posts/${postId}/reactions`, {}),

  groups: () => api.get('/community/groups'),
  group: (id) => api.get(`/community/groups/${id}`),
  createGroup: (name, description) => api.post('/community/groups', { name, description }),
  joinGroup: (id) => api.post(`/community/groups/${id}/join`),
  leaveGroup: (id) => api.post(`/community/groups/${id}/leave`),
  groupMessages: (id) => api.get(`/community/groups/${id}/messages`),
  sendGroupMessage: (id, body) => api.post(`/community/groups/${id}/messages`, { body }),

  conversations: () => api.get('/community/messages'),
  directMessages: (withUserId) => api.get(`/community/messages/${withUserId}`),
  sendDirectMessage: (withUserId, body) => api.post(`/community/messages/${withUserId}`, { body }),

  notifications: () => api.get('/community/notifications'),
};
