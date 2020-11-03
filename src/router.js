const router = require('express').Router();

const driverRouter = require('./driver/driver.routes');
const passengerRouter = require('./passengers/passenger.routes');

router.use('/driver', driverRouter);
router.use('/passenger', passengerRouter);

module.exports = router;
