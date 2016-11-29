'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
// const ev = require('express-validation');
const { camelizeKeys, decamelizeKeys } = require('humps');
const { checkAuth } = require('../middleware');

router.post('/api/products', checkAuth, (req, res, next) => {
  const brand = req.body.brandedName;
  const image = req.body.image.sizes.Large.url;
  const price = req.body.priceLabel;

  const userId = req.token.userId;
  const newPost = { brand, image, price, userId }
  const row = decamelizeKeys(newPost);

  knex('products')
    .insert(row, '*')
    .then((product) => {
      const post = camelizeKeys(product[0]);

      res.status(200)
        .send(post);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
