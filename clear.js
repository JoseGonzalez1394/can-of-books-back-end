'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

// Check name
mongoose.connect(process.env.DB_URL);

// Check name
const Book = require('./models/books');

async function clear() {
  try {
    await Book.deleteMany({});
    console.log('books cleared from DB');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

clear();