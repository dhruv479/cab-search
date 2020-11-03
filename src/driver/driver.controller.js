const { DriverModel, DriverLocationModel } = require('./driver.model');
const Boom = require('@hapi/boom');
const {
  addDriverValidation,
  updateLocationValidaiton,
} = require('./driver.validation');

const addDriverController = async (req, res, next) => {
  try {
    console.log(req.body);
    const { error } = addDriverValidation.validate(req.body);
    if (error) {
      throw Boom.badRequest(error.message);
    }
    let newDriver = await new DriverModel(req.body).save();
    const {
      driverId,
      name,
      email,
      phone_number,
      license_number,
      car_number,
    } = newDriver;
    return res.status(201).json({
      id: driverId,
      name,
      email,
      phone_number,
      license_number,
      car_number,
    });
  } catch (err) {
    next(err);
  }
};

const updateDriverLocation = async (req, res, next) => {
  try {
    const { driverId } = req.params;
    const { error } = updateLocationValidaiton.validate(req.body);
    if (error) {
      throw Boom.badRequest(error.message);
    }
    const { latitude, longitude } = req.body;
    await DriverLocationModel.findOneAndUpdate(
      { driverId },
      {
        longitude,
        latitude,
      },
      { upsert: true }
    );
    return res.status(202).json({ status: 'success' });
  } catch (err) {
    next(err);
  }
};

module.exports = { addDriverController, updateDriverLocation };
