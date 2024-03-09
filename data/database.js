const mongoose = require('mongoose'); // Import mongoose module for MongoDB connection

// MongoDB connection URI
const mongoURI = 'mongodb+srv://count:0258@testing.7u8zleq.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB')) // Log connection success
  .catch(err => console.error('Error connecting to MongoDB:', err)); // Log connection error
