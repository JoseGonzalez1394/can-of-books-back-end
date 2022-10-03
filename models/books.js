// This is where I define my schema
// WHAT the data should look like

'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const booksSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, required: true },
});

const BooksModel = mongoose.model('Books', booksSchema);

module.exports = BooksModel;