/**
 * @file book.js
 * @authors Jack Stubblefield
 * @description book schema for mongoDB
 */
'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: String,
  author: String,
  summary: String,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
