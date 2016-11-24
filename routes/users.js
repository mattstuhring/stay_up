'use strict';

const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const ev = require('express-validation');
const validations = require('../validations/users');
const { camelizeKeys, decamelizeKeys } = require('humps');

router.post('/api/users', ev(validations.post), (req, res, next) => {
  const { username, password } = req.body;

  knex('users')
    .select(knex.raw('1=1'))
    .where('username', username)
    .first()
    .then((exists) => {
      if (exists) {
        const err = new Error('Username already exists');

        err.status = 409;

        throw err;
      }

      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      const { firstName, lastName } = req.body;
      const user = { firstName, lastName, username, hashedPassword };
      const newUser = decamelizeKeys(user);

      return knex('users').insert(newUser, '*');
    })
    .then((newUsers) => {
      const user = camelizeKeys(newUsers[0]);

      delete user.hashedPassword;

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});




module.exports = router;
