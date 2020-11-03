const Joi = require('joi');

const availableCabValidation = Joi.object().keys({
  longitude: Joi.number().required().error(new Error('Logitude is not valid')),
  latitude: Joi.number().required().error(new Error('Latitude is not valid')),
});

module.exports = { availableCabValidation };
