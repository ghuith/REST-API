require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Database connection error:', err));

// Import the User model
const User = require('./models/User');

// Routes
// 1. Get All Users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// 2. Add a New User
app.post('/users', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json({ message: 'User created', newUser });
});

// 3. Edit a User by ID
app.put('/users/:id', async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: 'User updated', updatedUser });
});

// 4. Delete a User by ID
app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
