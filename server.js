'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/book');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;


// Connect to mongoose
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on('error', (err) => {
  console.error(`DB ERROR: ${err}`);
})
db.once('open', () => {
  console.log(`Connected to database`);
});

// Define the end point for books
app.get('/books', async (req, res) => {
  console.log(`request for books`);
  const filterQuery = {};
  if (req.query.location) {
    filterQuery.location = req.query.location;

  }
  const books = await Book.find(filterQuery);
  res.send(books);


});


app.get('/test', (req, res) => {

  res.send('test request received');

});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
