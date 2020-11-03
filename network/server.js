const express = require('express');
const Boom = require('@hapi/boom');
const middlewares = require('../middlewares/app.middleware');
const api = require('../src/router');
// const logger = require('../middlewares/logger');

const app = express();

middlewares(express, app);

app.use('/api/v1', api);

// ******************** Generate 404 Error ********************
app.use((_, res, next) => {
  return next(Boom.notFound('URL not Found!'));
});

// *********************** Error Response **********************
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, _) => {
  const { message = 'Oops! Something went wrong', isBoom, output } = error;
  console.log(error);
  if (isBoom) {
    return res.status(output.statusCode).json({
      reason: message,
      status: 'failure',
    });
  }

  return res.status(400).json({
    status: 'failure',
    reason: message,
  });
});

module.exports = app;
