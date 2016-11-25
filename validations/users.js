'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    username: Joi.string()
      .min(3)
      .max(255)
      .label('Username')
      .trim()
      .required(),
    password: Joi.string()
      .alphanum()
      .label('Password')
      .trim()
      .required()
  }
};
