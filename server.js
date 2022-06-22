'use strict';
//  sets up our middleware and other express server stuff
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// sets up mongoose and our book schema to go in our mongoDB
const mongoose = require('mongoose');
const Book = require('./models/book');

// idk what this does lol
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//this is our port numbe from the env file
const PORT = process.env.PORT || 3001;


// Connect to mongoose
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

// gives us an error message if something goes wrong when loading our DB
db.on('error', (err) => {
  console.error(`DB ERROR: ${err}`);
})

// fires once our server is officially online (Code 200)
db.once('open', () => {
  console.log(`Connected to database`);
});

// Define the end point for books
app.get('/books', async (req, res) => {
  console.log(`request for books`);
  const filterQuery = {};
  if (req.query.title) {
    filterQuery.title = req.query.title;
  }
  const books = await Book.find(filterQuery);
  res.send(books);
});

// Create a new book record
app.post('/books', async (req, res) => {
  try {
    console.log(`Creating a new book: ${JSON.stringify(req.body)}`);
    const newBook = await Book.create(req.body.newBook);
    
    res.send(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating a book');
  }
});

app.delete('/books/:id', async (req, res) => {
  const id = req.params.id;
  console.log(`Delete book with id ${id}`);
  try {
    await Book.findByIdAndDelete(id);
    res.status(204).send('Success');
  } catch (error) {
    console.error(error);
    res.status(404).send(`Unable to delete book with id: ${id}`)
    
  }
});


app.patch('/books/:id', async (req, res) => {
  const id = req.params.id;

  console.log(`Updated book with id ${id}, , Query params: ${JSON.stringify(req.body)}`);
  try {
    let updatedBook = await Book.findByIdAndUpdate(id, req.body)
    res.status(200).send(`book has been updated, ${updatedBook}`)
  } catch (error) {
    console.error(error)
  } 
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
