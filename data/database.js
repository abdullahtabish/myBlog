const mongoose = require('mongoose');

// MongoDB connection URI
const mongoURI = 'mongodb+srv://count:0258@testing.7u8zleq.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const postSchema = new mongoose.Schema({
  title: String,
  summary: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'author' },
});

const Post = mongoose.model('posts', postSchema);

const authorSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Author = mongoose.model('author', authorSchema);

module.exports = { Post, Author };
