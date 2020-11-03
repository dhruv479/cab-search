const Joi = require('joi');

const addDriverValidation = Joi.object().keys({
  name: Joi.string().trim().required().error(new Error('Name is not Valid')),
  email: Joi.string().trim().required().error(new Error('Email is not valid')),
  phone_number: Joi.number()
    .min(1000000000)
    .max(9999999999)
    .required()
    .error(new Error('Phone Number is not valid')),
  license_number: Joi.string()
    .trim()
    .required()
    .error(new Error('Licence number is not valid')),
  car_number: Joi.string()
    .trim()
    .required()
    .error(new Error('Car Number is not valid')),
});

const updateLocationValidaiton = Joi.object().keys({
  longitude: Joi.number().required().error(new Error('Logitude is not valid')),
  latitude: Joi.number().required().error(new Error('Latitude is not valid')),
});

module.exports = { addDriverValidation, updateLocationValidaiton };
