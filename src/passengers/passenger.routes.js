const router = require('express').Router();
const { getAvailableCabs } = require('./passenger.controller');

router.post('/available_cabs', getAvailableCabs);

module.exports = router;
