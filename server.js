'use strict';

// Requirements
require('dotenv').config();
const cors = require('cors');
const express = require('express');
// bring in mongoose
const mongoose = require('mongoose');

// Set up Express App
const app = express();
// Middleware
app.use(cors());
// If req.body is undefined, make sure to use express.json() middleware!
app.use(express.json());
// Mongoose 
mongoose.connect(process.env.DB_URL); // DB url in our .env goes here
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error'));
db.once('open', function() {
    console.log('Mongoose is connected to mongo');
});
const Books = require('./models/books.js');

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));


// Endpoints

app.get('/', (req, res) => {
    res.status(200).send('Welcome!');
});


app.get('/books', getBooks);

async function getBooks(req, res) {
    try {
        // queries our mongo cats-db database, and finds all cats
        const results = await Books.find();
        res.status(200).send(results);
    } catch (error) {
        res.status(500).send(error);
    }
}

// POST Endpoint, will trigger a Create action on our db
app.post('/books', postBook);

async function postBook(req, res, next){
  try{
    const addBook = await Books.create(req.body);
    res.status(201).send(addBook);
  } catch (error) {
    next(error);
  }
}

// DELETE Endpoint

app.delete('/books/:id', deleteBook);

async function deleteBook(req, res, next) {
    const id = req.params.id;
    console.log(id);
    try {
        await Books.findByIdAndDelete(id);
        res.status(204).send('Successfully Deleted');
    } catch (error) {
        next(error);
    }
}

// PUT Endpoint

app.put('/books/:id', putBooks);

async function putBooks(req, res, next){
  try{
    let id = req.params.id;
    let data = req.body;
    const updateBook = await Books.findByIdAndUpdate(id, data, {new: true, overwrite: true});
    res.status(201).send(updateBook);
  } catch (error) {
    next(error);
  }
}

app.get('*', (req, res) => {
    res.status(404).send('Not available');
});

// put this error handling at the bottom
// It's the last app.use()!
app.use((error, req, res, next) => {
    res.status(500).send(error.message);
}) 
