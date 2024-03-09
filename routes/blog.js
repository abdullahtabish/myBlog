const express = require('express');
const router = express.Router();
const { Post, Author } = require('../data/database');

// Route to render the posts list page
router.get('/posts', async function(req, res) {
  try {
    const posts = await Post.find().populate('author');
    res.render('posts-list', { posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle creating a new post
router.post('/posts', async function(req, res) {
  try {
    const { title, summary, body, _id } = req.body;
    const post = new Post({ title, summary, body, author: _id });
    await post.save();
    res.redirect('/posts');
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to render the new post creation page
router.get('/new-post', async function(req, res) {
  try {
    const authors = await Author.find();
    res.render('create-post', { authors });
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to render a specific post
router.get('/posts/:id', async function(req, res) {
  try {
    const post = await Post.findById(req.params.id).populate('author');
    res.render('post-detail', { post });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to render the edit post page
router.get('/posts/:id/edit', async function(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    const authors = await Author.find();
    res.render('update-post', { post, authors });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle editing a specific post
router.post('/posts/:id/edit', async function(req, res) {
  try {
    const { title, summary, body, _id } = req.body;
    await Post.findByIdAndUpdate(req.params.id, { title, summary, body, author: _id });
    res.redirect('/posts');
  } catch (error) {
    console.error('Error editing post:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle deleting a specific post
router.post('/posts/:id/delete', async function(req, res) {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/posts');
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
