/**
 * @file book.js
 * @authors Jack Stubblefield, Mike Pace
 * @description book schema for mongoDB
 */
'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: String,
  summary: String,
  author: String
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
