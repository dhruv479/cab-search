const { model, Schema } = require('mongoose');

const CounterSchema = Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
const counter = model('counter', CounterSchema);

const driverSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  driverId: {
    type: Number,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email is already linked to another account'],
  },
  phone_number: {
    type: String,
    required: true,
    unique: [true, 'Phone Number is already linked'],
  },
  license_number: {
    type: String,
    required: true,
    unique: [true, 'License number is already linked'],
  },
  car_number: {
    type: String,
    required: true,
    unique: [true, 'Car Number is already linked'],
  },
});

const driverLocationSchema = new Schema({
  driverId: {
    type: Number,
    ref: 'driver',
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

driverSchema.pre('save', function (next) {
  let doc = this;
  counter.findByIdAndUpdate(
    { _id: 'driverId' },
    { $inc: { seq: 1 } },
    { upsert: true, new: true },
    function (error, response) {
      if (error) {
        next(error);
      }
      doc.driverId = response.seq;
      next();
    }
  );
});

const DriverModel = model('driver', driverSchema),
  DriverLocationModel = model('driverlocation', driverLocationSchema);

module.exports = { DriverModel, DriverLocationModel };
