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
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
});

const Post = mongoose.model('Post', postSchema);

const authorSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Author = mongoose.model('Author', authorSchema);

module.exports = { Post, Author };
