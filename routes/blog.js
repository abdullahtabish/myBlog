const express = require('express'); // Import express module
const router = express.Router(); // Create a new router instance
const db = require('../data/database'); // Import database module

// Route to render the posts list page
router.get('/posts', async function(req, res) {
  try {
    // Query to fetch posts along with author names
    const posts = await db.query(
      "SELECT posts.*, authors.name AS author_name FROM posts INNER JOIN authors ON posts.author_id = authors.id"
    );
    res.render('posts-list', { posts }); // Render the posts list page with fetched posts
  } catch (error) {
    console.error('Error fetching posts:', error); // Log any errors
    res.status(500).send('Internal Server Error'); // Send an error response
  }
});

// Route to handle creating a new post
router.post('/posts', async function(req, res) {
  try {
    // Extract data from request body
    const { title, summary, body, author_id } = req.body;
    // Query to insert new post into database
    await db.query(
      "INSERT INTO posts (title, summary, body, author_id) VALUES (?, ?, ?, ?)",
      [title, summary, body, author_id]
    );
    res.redirect('/posts'); // Redirect to the posts list page after successful creation
  } catch (error) {
    console.error('Error creating post:', error); // Log any errors
    res.status(500).send('Internal Server Error'); // Send an error response
  }
});

// Route to render the new post creation page
router.get('/new-post', async function(req, res) {
  try {
    // Query to fetch all authors
    const authors = await db.query("SELECT * FROM authors");
    res.render('create-post', { authors }); // Render the new post creation page with fetched authors
  } catch (error) {
    console.error('Error fetching authors:', error); // Log any errors
    res.status(500).send('Internal Server Error'); // Send an error response
  }
});

// Route to render a specific post
router.get('/posts/:id', async function(req, res) {
  try {
    // Query to fetch a specific post along with author details
    const [post] = await db.query(
      "SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts INNER JOIN authors ON posts.author_id = authors.id WHERE posts.id = ?",
      [req.params.id]
    );
    res.render('post-details', { post }); // Render the post details page with fetched post
  } catch (error) {
    console.error('Error fetching post:', error); // Log any errors
    res.status(500).send('Internal Server Error'); // Send an error response
  }
});

// Route to render the edit post page
router.get('/posts/:id/edit', async function(req, res) {
  try {
    // Query to fetch a specific post
    const [post] = await db.query("SELECT * FROM posts WHERE id = ?", [req.params.id]);
    res.render('edit-post', { post }); // Render the edit post page with fetched post
  } catch (error) {
    console.error('Error fetching post:', error); // Log any errors
    res.status(500).send('Internal Server Error'); // Send an error response
  }
});

// Route to handle editing a specific post
router.post('/posts/:id/edit', async function(req, res) {
  try {
    // Extract data from request body
    const { title, summary, body } = req.body;
    // Query to update a specific post
    await db.query("UPDATE posts SET title = ?, summary = ?, body = ? WHERE id = ?", [title, summary, body, req.params.id]);
    res.redirect('/posts'); // Redirect to the posts list page after successful edit
  } catch (error) {
    console.error('Error editing post:', error); // Log any errors
    res.status(500).send('Internal Server Error'); // Send an error response
  }
});

// Route to handle deleting a specific post
router.post('/posts/:id/delete', async function(req, res) {
  try {
    // Query to delete a specific post
    await db.query("DELETE FROM posts WHERE id = ?", [req.params.id]);
    res.redirect('/posts'); // Redirect to the posts list page after successful deletion
  } catch (error) {
    console.error('Error deleting post:', error); // Log any errors
    res.status(500).send('Internal Server Error'); // Send an error response
  }
});

module.exports = router; // Export router for use in other files
