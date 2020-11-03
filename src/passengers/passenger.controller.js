const Boom = require('@hapi/boom');
const { DriverLocationModel } = require('../driver/driver.model');
const { haversineDistance } = require('../utils/haversine');
const { availableCabValidation } = require('./passenger.validation');

const getAvailableCabs = async (req, res, next) => {
  try {
    const { error } = availableCabValidation.validate(req.body);
    if (error) {
      throw Boom.badRequest(error.message);
    }
    const { longitude, latitude } = req.body;
    let cabs = await DriverLocationModel.aggregate()
      .lookup({
        from: 'drivers',
        let: { driverID: '$driverId' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$driverId', '$$driverID'] },
            },
          },
          {
            $project: { name: 1, car_number: 1, phone_number: 1, _id: -1 },
          },
        ],
        as: 'driverDetails',
      })
      .unwind('$driverDetails');
    const available_cabs = [];
    cabs.map((cab) => {
      if (
        haversineDistance(
          [cab.latitude, cab.longitude],
          [latitude, longitude]
        ) <= 4
      ) {
        const { name, car_number, phone_number } = cab.driverDetails;
        available_cabs.push({ name, car_number, phone_number });
      }
    });
    if (available_cabs.length === 0) {
      return res.json({ message: 'No cabs available!' });
    }
    return res.json({ available_cabs });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAvailableCabs };
