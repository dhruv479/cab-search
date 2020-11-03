const router = require('express').Router();
const {
  addDriverController,
  updateDriverLocation,
} = require('./driver.controller');

router.post('/register', addDriverController);
router.post('/:driverId/sendLocation', updateDriverLocation);

module.exports = router;
