// src/config/db.js
const { Model } = require('objection');
const knex = require('./knex');

Model.knex(knex);

module.exports = Model;