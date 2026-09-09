// Comment endpoints live alongside posts (see posts.js's /posts/:id/comments)
// since the original community/feed.php handled both in one script. This
// file is kept to match the target api/community/comments.php filename.
export { default } from './posts.js';
