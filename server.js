'use strict';
//  sets up our middleware and other express server stuff
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// sets up mongoose and our book schema to go in our mongoDB
const mongoose = require('mongoose');
const Book = require('./models/book');

// idk what this does lol
const app = express();
app.use(cors());

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



app.get('/test', (req, res) => {

  res.send('test request received');

});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
