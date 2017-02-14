/* eslint-disable no-param-reassign */
const express = require('express');

module.exports = express.Router()
  .post('/logout', (req, res) => {
    delete req.session.user;
    return res.json({});
  })
  .patch('/', (req, res) => {
    if (!req.session.user) {
      req.session.user = {};
    }
    Object.assign(req.session.user, req.body);
    res.json({});
  });
