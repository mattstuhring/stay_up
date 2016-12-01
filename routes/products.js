'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
// const ev = require('express-validation');
const { camelizeKeys, decamelizeKeys } = require('humps');
const { checkAuth } = require('../middleware');


router.get('/api/products', checkAuth, (req, res, next) => {
  knex('products')
    .where('user_id', req.token.userId)
    .orderBy('id', 'desc')
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      next(err);
    });
});



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



router.delete('/api/products/:id', checkAuth, (req, res, next) => {
  const userId = req.token.userId;
  const productId = req.params.id;
  console.log('userId', userId);
  console.log('productId', productId);

  knex('products')
    .where('id', productId)
    .first()
    .then((p) => {
      return knex('products')
        .del()
        .where('id', productId)
        .then(() => {
          delete p.id;
          res.send(p);
        });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
