const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL);

const book = require('./models/book');

async function seed() {
  // seed the database with some books, so I can retrieve them
  const mybook = new book({
    title: 'Jimmy John',
    deescription: 'orange',
    status: 'yes'
  });
  mybook.save(function (err) {
    if (err) console.error(err);
    else console.log('saved Jimmy John');
  });

  // alternately...
  await book.create({
    title: 'Jersey mike',
    deescription: 'orange',
    status: 'yes'
  });

  mongoose.disconnect();
}

seed();